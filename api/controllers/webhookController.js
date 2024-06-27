const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const User = require("../models/User");
const {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} = require("../utils/error");
const webhookService = require("../services/webhookService");
const { validationResult } = require("express-validator");
const { default: axios } = require("axios");
const CustomerReceipt = require("../models/CustomerReceipt");

const REVENUECAT_API_KEY = process.env.RC_IOS_KEY;

const syncSubscriptionStatus = async (event) => {
  console.log(event, 'EVENT!!');

  // maybe event.transferred_to[0] is wrong since could be transfered to two people?
  const appUserId = event.type === 'TRANSFER' ? event.transferred_to?.[0] : event.app_user_id

  try {
    const customerInfoRes = await axios.get(
      `https://api.revenuecat.com/v1/subscribers/${appUserId}`,
      {
        headers: {
          Authorization: `Bearer ${REVENUECAT_API_KEY}`,
        },
      }
    );

    const customerInfo = customerInfoRes.data;
    // IF ever have different entitlement name, need to change!
    const proEntitlement = customerInfo.subscriber.entitlements.Pro;
    const expiresDate = new Date(proEntitlement.expires_date);
    // grace handles billing issues
    const gracePeriodExpiresDate = proEntitlement.grace_period_expires_date ? new Date(proEntitlement.grace_period_expires_date) : null;

    const currentDate = new Date();

    const isSubscribed = (expiresDate > currentDate) || (gracePeriodExpiresDate && gracePeriodExpiresDate > currentDate);
    console.log(proEntitlement, expiresDate, currentDate, isSubscribed, gracePeriodExpiresDate);


    await User.findOneAndUpdate(
      { firebaseId: appUserId },
      { $set: { isSubscribed: isSubscribed, activeSubscription: null } }, // could change activeSub
    );

    if (event?.transferred_from) {
      await User.findOneAndUpdate(
      { firebaseId: event.transferred_from?.[0] },
      { $set: { isSubscribed: false, activeSubscription: null } }, // could change activeSub
    );
    }
    

    // Could remove if too much data? but probs fine
    await CustomerReceipt.create(customerInfo.subscriber)

    // await CustomerReceipt.create(customerInfo)
  } catch (error) {
    console.error("Error checking subscription status from RevenueCat", error);
    // maybe add a retry if 429 in future?
    throw error // throw to global error handler
    // return null; // Handle error appropriately
  }
};

const handleRcEvents = async (req, res) => {
  // Check if the incoming webhook is authorized
  if (req.headers.authorization !== `Bearer ${process.env.WEBHOOK_KEY}`) {
    throw new UnauthorizedError(
      "Not Authorised, Incorrect authrisation header",
      req.headers.authorization
    );
  }

  // Always respond to RevenueCat to acknowledge receipt of the webhook
  res.status(200).send("Webhook processed");

  // Handle different types of webhook events
  const event = req.body.event;

  await syncSubscriptionStatus(event);

  // await processWebhookEvent(event); // maybe will use in future when send emails
  // Might need to make this Asyncronous!? to make sure doesnt block main thread?
};

const processWebhookEvent = async (event) => {
  try {
    switch (event.type) {
      case "INITIAL_PURCHASE":
        await webhookService.handleInitialPurchase(event);
        console.log(event);
        break;
      case "RENEWAL":
        await webhookService.handleRenewalPurchase(event);
        console.log(event);
        break;
      case "CANCELLATION":
        await webhookService.handleCancellation(event);
        console.log(event);
        break;
      case "UNCANCELLATION":
        await webhookService.handleUncancellation(event);
        console.log(event);
        break;
      case "NON_RENEWING_PURCHASE":
        await webhookService.handleNonRenewingPurchase(event);
        console.log(event);
        break;
      case "EXPIRATION":
        await webhookService.handleExpiration(event);
        console.log(event);
        break;
      case "BILLING_ISSUE":
        await webhookService.handleBillingIssue(event);
        console.log(event);
        break;
      case "PRODUCT_CHANGE":
        await webhookService.handleProductChange(event);
        console.log(event);
        break;
      case "TRANSFER":
        await webhookService.handleTransfer(event);
        console.log(event);
        break;
      case "SUBSCRIPTION_EXTENDED":
        await webhookService.handleSubscriptionExtended(event);
        console.log(event);
        break;
      case "TEMPORARY_ENTITLEMENT_GRANT":
        await webhookService.handleTemporaryEntitlementGrant(event);
        console.log(event);
        break;
      default:
        console.log("Unhandled event type:", event);
    }
  } catch (error) {
    console.error("Error processing webhook event", error);
    // Optionally, handle specific error logging or notifications
  }
};

module.exports = {
  handleRcEvents,
};

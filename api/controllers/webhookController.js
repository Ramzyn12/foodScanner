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

  // Maybe here log the event? or call the rest API as they say to then log response
  processWebhookEvent(event);
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

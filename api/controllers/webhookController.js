const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const User = require("../models/User");
const { NotFoundError, ValidationError, UnauthorizedError } = require("../utils/error");
const webhookService = require("../services/webhookService");
const { validationResult } = require("express-validator");

const handleRcEvents = (req, res) => {
  // Check if the incoming webhook is authorized
  if (req.headers.authorization !== `Bearer ${process.env.WEBHOOK_KEY}`) {
    throw new UnauthorizedError(
      "Not Authorised, Incorrect authrisation header",
      req.headers.authorization
    );
  }

  // Handle different types of webhook events
  const event = req.body.event;

  // Maybe here log the event? or call the rest API as they say to then log response

  switch (event) {
    case "INITIAL_PURCHASE":
      webhookService.handleInitialPurchase(event)
      console.log(event);
      break;
    case "RENEWAL":
      webhookService.handleRenewalPurchase(event)
      console.log(event);
      break;
    case "CANCELLATION":
      webhookService.handleCancellation(event)
      console.log(event);
      break;
    case "UNCANCELLATION":
      webhookService.handleUncancellation(event)
      console.log(event);
      break;
    case "NON_RENEWING_PURCHASE":
      webhookService.handleNonRenewingPurchase(event)
      console.log(event);
      break;
    case "EXPIRATION":
      webhookService.handleExpiration(event)
      console.log(event);
      break;
    case "BILLING_ISSUE":
      webhookService.handleBillingIssue(event)
      console.log(event);
      break;
    case "PRODUCT_CHANGE":
      webhookService.handleProductChange(event)
      console.log(event);
      break;
    case "TRANSFER":
      webhookService.handleTransfer(event)
      console.log(event);
      break;
    case "SUBSCRIPTION_EXTENDED":
      webhookService.handleSubscriptionExtended(event)
      console.log(event);
      break;
    case "TEMPORARY_ENTITLEMENT_GRANT":
      webhookService.handleTemporaryEntitlementGrant(event)
      console.log(event);
      break;
    default:
      console.log("Unhandled event type:", event);
  }

  // Always respond to RevenueCat to acknowledge receipt of the webhook
  res.status(200).send("Webhook processed");
};

module.exports = {
  handleRcEvents,
};

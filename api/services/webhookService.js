const { default: axios } = require("axios");
const User = require("../models/User");
const { NotFoundError } = require("../utils/error");
const CustomerReceipt = require("../models/CustomerReceipt");



async function handleInitialPurchase(event) {

  if (event.period_type === "TRIAL") {
    // Send email in 5 days as reminder
  }

  // Send welcome email
  // Log the transaction
}

async function handleRenewalPurchase(event) {


  // Send confirmation email or notification about renewal
  // Log the transaction
}

async function handleCancellation(event) {

  // Look at and handle the differnet cancel reasons!
  if (event.cancel_reason === "UNSUBSCRIBE") {
    // Send sorry gone email and setup retention offer?
    // schedule a retention offer
  } else if (event.cancel_reason === "BILLING_ERROR") {
    // Flag the user account as having billing issues
    // Notify the user they need to update billing or will expire
    // Could find expiration time via the end_period or something
    // Could send them link or instruciton to reduce churn
  } else if (event.cancel_reason === "DEVELOPER_INITIATED") {
    // Send email saying we needed to cancel because...
  } else if (event.cancel_reason === "PRICE_INCREASE") {
    // Maybe offer rentention offer or say bye email etc..
  } else {
    // CUSTOMER_SUPPORT || UNKNOWN
    // Do something else
  }
}

async function handleUncancellation(event) {
  // Log the event
  // email we're happy to have you back!
}
async function handleNonRenewingPurchase() {
  // Log the purchase and possibly trigger a specific business logic depending on the product purchased
  // Think I only need this for lifetime purchases so leave it for now?
  console.log("ONLY TRIGGERS FOR LIFETIME?");
}

async function handleExpiration(event) {
  // Update the user's subscription status

  // Email sad to see you go - offer rentention maybe?
  // Log event
}

async function handleBillingIssue() {
  // Can be safely ignored since handled in Cancellation reason BILLING_ISSUE
}

async function handleProductChange(event) {
  // Update the user's subscription details to reflect the new product
  // MAY NOT WANT TO UPDATE PRODUCT AS IT ONLY CHANGES AFTER LAST ONE ENDS

  // Send email explaining what will happen now product change
  // E.g if changed from year to month, will need to wait for year to expire
  // Log the change and adjust entitlements if necessary
}
async function handleTransfer(event) {
  

}
async function handleSubscriptionExtended() {
  // Extend the user's subscription end date
  // Log the extension and possibly notify the user
  // This only happens if promtional offer / customer service etc...
}
async function handleTemporaryEntitlementGrant(event) {
  // Grant the user 24 hour access to premium features
  // Ensure to track the start and end dates of this entitlement
  // This event is sent in exceptional situations (for example, a partial app store outage)
  // and is used to avoid customers making a purchase but not getting access to their entitlement.

}

module.exports = {
  handleInitialPurchase,
  handleRenewalPurchase,
  handleNonRenewingPurchase,
  handleExpiration,
  handleBillingIssue,
  handleProductChange,
  handleTransfer,
  handleSubscriptionExtended,
  handleTemporaryEntitlementGrant,
  handleCancellation,
  handleUncancellation,
};

const User = require("../models/User");
const { NotFoundError } = require("../utils/error");

async function handleInitialPurchase(event) {
  // Here, you would typically update the user's subscription status to active
  // You could also initialize subscription-specific data, send a welcome email, or log the transaction

  const user = await User.findOneAndUpdate(
    { firebaseId: event.app_user_id },
    { $set: { isSubscribed: true, activeSubscription: event.product_id } },
    { new: true }
  );

  if (!user)
    throw new NotFoundError("User not found with this firebaseId", {
      firebaseId,
    });

  // Send welcome email
  // Log the transaction
}
async function handleRenewalPurchase(event) {
  // Update user subscription status and expiry date
  // Log the renewal transaction and update any relevant user metrics

  const user = await User.findOneAndUpdate(
    { firebaseId: event.app_user_id },
    { $set: { isSubscribed: true, activeSubscription: event.product_id } },
    { new: true }
  );

  if (!user)
    throw new NotFoundError("User not found with this firebaseId", {
      firebaseId,
    });
}

async function handleCancellation(event) {
  // Set the user's subscription status to inactive or cancelled
  // Optionally, schedule an exit survey email or retention offer

  const user = await User.findOneAndUpdate(
    { firebaseId: event.app_user_id },
    { $set: { isSubscribed: false, activeSubscription: null } },
    { new: true }
  );

  if (!user)
    throw new NotFoundError("User not found with this firebaseId", {
      firebaseId,
    });

  // Send sorry gone email and setup retention offer?
}
async function handleUncancellation() {
  // Update the subscription status back to active
  // You might also want to log this event or inform other services that the user has uncanceled
}
async function handleNonRenewingPurchase() {
  // Log the purchase and possibly trigger a specific business logic depending on the product purchased
  // Think I only need this for lifetime purchases
}
async function handleExpiration() {
  // Update the user's subscription status to expired
  // Clean up any entitlements associated with the subscription
}
async function handleBillingIssue() {
  // Flag the user account as having billing issues
  // Trigger communication to the user to update their payment method
}
async function handleProductChange() {
  // Update the user's subscription details to reflect the new product
  // Probs just need to change package type rather than isSubscribed
  // Log the change and adjust entitlements if necessary
}
async function handleTransfer() {
  // Update both the transferring and receiving user's subscription status
  // This might involve revoking access from one user and granting it to another
}
async function handleSubscriptionExtended() {
  // Extend the user's subscription end date
  // Log the extension and possibly notify the user
}
async function handleTemporaryEntitlementGrant() {
  // Grant the user temporary access to premium features
  // Ensure to track the start and end dates of this entitlement
  // might be part of a promotional offer, Marketing scheme, or a corrective action in response to a service issue
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

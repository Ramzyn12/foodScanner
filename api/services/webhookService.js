const User = require("../models/User");
const { NotFoundError } = require("../utils/error");

// Here, you would typically update the user's subscription status to active
// You could also initialize subscription-specific data, send a welcome email, or log the transaction
async function handleInitialPurchase(event) {
  // Update user subscription state
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

// Update user subscription status and expiry date
// Log the renewal transaction and update any relevant user metrics
async function handleRenewalPurchase(event) {
  const user = await User.findOneAndUpdate(
    { firebaseId: event.app_user_id },
    { $set: { isSubscribed: true, activeSubscription: event.product_id } },
    { new: true }
  );

  if (!user)
    throw new NotFoundError("User not found with this firebaseId", {
      firebaseId,
    });

  // Send welcome back email
  // Log / update the transaction
}

async function handleCancellation(event) {
  // Look at and handle the differnet cancel reasons!
  // Optionally, schedule an exit survey email or retention offer
  // Send sorry gone email and setup retention offer?
}

async function handleUncancellation(event) {
  // Update the subscription status back to active
  // You might also want to log this event or inform other services that the user has uncanceled
}
async function handleNonRenewingPurchase() {
  // Log the purchase and possibly trigger a specific business logic depending on the product purchased
  // Think I only need this for lifetime purchases so leave it for now?
  console.log("ONLY TRIGGERS FOR LIFETIME?");
}

async function handleExpiration(event) {
  // Update the user's subscription status

  const user = await User.findOneAndUpdate(
    { firebaseId: event.app_user_id },
    { $set: { isSubscribed: false, activeSubscription: null } },
    { new: true }
  );

  if (!user)
    throw new NotFoundError("User not found with this firebaseId", {
      firebaseId,
    });
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
  // This event is sent in exceptional situations (for example, a partial app store outage) and is used to avoid customers making a purchase but not getting access to their entitlement. 
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

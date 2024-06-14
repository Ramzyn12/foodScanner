const { default: axios } = require("axios");
const User = require("../models/User");
const { NotFoundError } = require("../utils/error");
const CustomerReceipt = require("../models/CustomerReceipt");

const REVENUECAT_API_KEY = process.env.RC_IOS_KEY;

const getAndStoreCustomerReceipts = async (event) => {
  try {
    const customerInfoRes = await axios.get(
      `https://api.revenuecat.com/v1/subscribers/${event.app_user_id}`,
      {
        headers: {
          Authorization: `Bearer ${REVENUECAT_API_KEY}`,
        },
      }
    );

    const customerInfo = customerInfoRes.data.subscriber

    await CustomerReceipt.create(customerInfo)
  } catch (error) {
    console.error("Error checking subscription status from RevenueCat", error);
    return null; // Handle error appropriately
  }
};

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

  if (event.period_type === "TRIAL") {
    // Send email in 5 days as reminder
  }

  // Send welcome email
  // Log the transaction
}

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

  const customerInfo = await getAndStoreCustomerReceipts(event);
  console.log(customerInfo);

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
  // Log to database
  const customerInfo = await getAndStoreCustomerReceipts(event);
  console.log(customerInfo);
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

  const user = await User.findOneAndUpdate(
    { firebaseId: event.app_user_id },
    { $set: { isSubscribed: false, activeSubscription: null } },
    { new: true }
  );

  if (!user)
    throw new NotFoundError("User not found with this firebaseId", {
      firebaseId,
    });

    const customerInfo = await getAndStoreCustomerReceipts(event);
    console.log(customerInfo);
  // Email sad to see you go - offer rentention maybe?
  // Log event
}

async function handleBillingIssue() {
  // Can be safely ignored since handled in Cancellation reason BILLING_ISSUE
}

async function handleProductChange(event) {
  // Update the user's subscription details to reflect the new product
  // MAY NOT WANT TO UPDATE PRODUCT AS IT ONLY CHANGES AFTER LAST ONE ENDS

  // const user = await User.findOneAndUpdate(
  //   { firebaseId: event.app_user_id },
  //   { $set: { activeSubscription: event.new_product_id } },
  //   { new: true }
  // );

  // if (!user)
  //   throw new NotFoundError("User not found with this firebaseId", {
  //     firebaseId,
  //   });

  console.log(event);
  // Send email explaining what will happen now product change
  // E.g if changed from year to month, will need to wait for year to expire
  // Log the change and adjust entitlements if necessary
}
async function handleTransfer(event) {
  // Update both the transferring and receiving user's subscription status
  // This might involve revoking access from one user and granting it to another
  // MAY NEED TO ADD transactions here as important both dont fail

  const transfererFirebaseId = event.transferred_from;
  const recipientFirebaseId = event.transferred_to;

  // Returns previous document so we can use the activeSubscription
  const transferringUser = await User.findOneAndUpdate(
    { firebaseId: transfererFirebaseId },
    { $set: { isSubscribed: false, activeSubscription: null } }
  );

  if (!transferringUser) {
    throw new NotFoundError("Transferring user not found", {
      firebaseId: transfererFirebaseId,
    });
  }

  const receivingUser = await User.findOneAndUpdate(
    { firebaseId: recipientFirebaseId },
    {
      $set: {
        isSubscribed: true,
        activeSubscription: transferringUser.activeSubscription,
      },
    },
    { new: true } // Include session to make this part of the transaction
  );

  if (!receivingUser) {
    throw new NotFoundError("Recieving user not found", {
      firebaseId: transfererFirebaseId,
    });
  }
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

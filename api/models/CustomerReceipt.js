const mongoose = require('mongoose');
const { Schema } = mongoose;

const entitlementSchema = new Schema({
  expires_date: Date,
  grace_period_expires_date: Date,
  product_identifier: String,
  purchase_date: Date
});

const subscriptionSchema = new Schema({
  auto_resume_date: Date,
  billing_issues_detected_at: Date,
  expires_date: Date,
  grace_period_expires_date: Date,
  is_sandbox: Boolean,
  original_purchase_date: Date,
  ownership_type: String,
  period_type: String,
  purchase_date: Date,
  refunded_at: Date,
  store: String,
  store_transaction_id: String,
  unsubscribe_detected_at: Date
});

const customerReceiptSchema = new Schema({
  entitlements: {
    type: Map,
    of: entitlementSchema
  },
  first_seen: Date,
  last_seen: Date,
  management_url: String,
  non_subscriptions: {
    type: Map,
    of: Object
  },
  original_app_user_id: String,
  original_application_version: String,
  original_purchase_date: Date,
  other_purchases: {
    type: Map,
    of: Object
  },
  subscriptions: {
    type: Map,
    of: subscriptionSchema
  }
});

const CustomerReceipt = mongoose.model('CustomerReceipt', customerReceiptSchema);

module.exports = CustomerReceipt;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Initiated", required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
module.exports = mongoose.model("Order", OrderSchema);

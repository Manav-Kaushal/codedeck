var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
    discountPercentage: { type: Number },
    availableQty: { type: Number, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
module.exports = mongoose.model("Product", ProductSchema);

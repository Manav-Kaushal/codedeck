import connectDB from "../../middleware/mongoose";
import ProductModel from "../../models/Product";

const handler = async (req, res) => {
  let products = await ProductModel.find();
  res.status(200).json({ products });
};

export default connectDB(handler);

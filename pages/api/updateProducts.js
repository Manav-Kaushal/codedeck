import connectDB from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let updatedProducts;
    for (let i = 0; i < req.body.length; i++) {
      updatedProducts = await Product.findByIdAndUpdate(
        req.body[i]._id,
        req.body[i]
      );
    }
    res.status(200).json({ success: true, data: [updatedProducts] });
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDB(handler);

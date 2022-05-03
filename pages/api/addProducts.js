import connectDB from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let newProduct;
    for (let i = 0; i < req.body.length; i++) {
      newProduct = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        description: req.body[i].description,
        imageSrc: req.body[i].imageSrc,
        category: req.body[i].category,
        size: req.body[i].size,
        color: req.body[i].color,
        price: req.body[i].price,
        discount: req.body[i].discount,
        discountPercentage:
          Math.round(
            ((req.body[i]?.price - req.body[i]?.discount) /
              req.body[i]?.price) *
              100
          ),
        availableQty: req.body[i].availableQty,
      });
      await newProduct.save();
    }
    res.status(200).json({ success: true, data: [newProduct] });
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDB(handler);

import connectDB from "../../middleware/mongoose";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDB(handler);

import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let newUser = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, "secret key 123").toString(),
    });
    await newUser.save();
    res.status(200).json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDB(handler);

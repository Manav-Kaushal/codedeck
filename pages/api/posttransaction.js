import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  // Validate Paytm checksum

  // Update status into orders table after checking transaction status
  let order;
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }

  // Initiate shipping

  // Redirect user to order confirmation page

  res.redirect("/order?id=" + order._id, 200);
  // res.status(200).json({ body: req.body });
};

export default connectDB(handler);

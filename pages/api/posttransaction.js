export default function handler(req, res) {
  // Update status into orders table after checking transaction status
  // Initiate shipping
  // Redirect user to order confirmation page
  res.status(200).json({ body: req.body });
}

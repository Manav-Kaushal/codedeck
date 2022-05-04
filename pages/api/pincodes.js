export default function handler(req, res) {
  let pincodes = {
    160020: ["Chandigarh", "Chandigarh"],
    110003: ["Delhi", "Delhi"],
    560017: ["Bangalore", "Karnataka"],
  };
  res.status(200).json(pincodes);
}

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

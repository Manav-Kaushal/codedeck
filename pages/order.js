import Link from "next/link";
import Lottie from "react-lottie";
import animationData from "@static/confetti.json";
import { useRouter } from "next/router";
import Order from "../models/Order";
import mongoose from "mongoose";
import { numberFormat } from "@utils/helpers";
import { useEffect } from "react";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const UserOrder = ({ order, clearCart }) => {
  const router = useRouter();
  const { id, emptyCart } = router.query;
  const products = order?.products;

  useEffect(() => {
    if (emptyCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 cursor-default">
        <Lottie
          options={defaultOptions}
          height={245}
          width={990}
          className="w-full cursor-default pointer-events-none"
        />
      </div>
      <div className="bg-white">
        <div className="max-w-screen-lg mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Thank you!
            </h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              It&apos;s on the way!
            </p>
            <p className="mt-2 text-base text-gray-500">
              Your order has been successfully placed.
            </p>
          </div>

          <div className="mt-10 border-t border-gray-200 shadow-md px-6 sm:px-12">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>
            <dl className="mt-12 font-bold flex items-center justify-between">
              <dt className="text-gray-900 text-base">
                <span>Order ID: #{order?.orderId} </span>
                <span className="text-blue-500 cursor-pointer text-sm">
                  Track
                </span>
              </dt>
              <dt className="text-gray-900 text-base">
                Payment Status:{" "}
                <span className="text-emerald-500">{order?.status}</span>
              </dt>
              <dt className="text-gray-900 text-base">
                Amount: {numberFormat(order?.amount)}
              </dt>
            </dl>
            {Object.keys(products).map((key) => (
              <div
                key={key}
                className="pt-10 pb-4 border-b border-gray-200 space-x-6"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <a href={key} className="font-semibold">
                        {products[key]?.name} ({products[key]?.size}/
                        {products[key]?.variant})
                      </a>
                    </h4>
                  </div>
                  <div className="flex items-center">
                    <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      <div className="flex space-x-2">
                        <dt className="font-semibold text-gray-900">
                          Quantity
                        </dt>
                        <dd className="text-gray-700">{products[key]?.qty}</dd>
                      </div>
                      <div className="pl-4 flex sm:pl-6 space-x-2">
                        <dt className="font-semibold text-gray-900">Price</dt>
                        <dd className="text-gray-700">
                          {numberFormat(products[key]?.qty)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Addresses</h4>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm py-10">
                <div>
                  <dt className="font-semibold text-gray-900">
                    Shipping address
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block"></span>
                      <span className="block">{order?.address}</span>
                      <span className="block">Toronto, ON N3Y 4H8</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">
                    Billing address
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">Kristin Watson</span>
                      <span className="block">7363 Cynthia Pass</span>
                      <span className="block">Toronto, ON N3Y 4H8</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">
                    Payment method
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <p>Apple Pay</p>
                    <p>Mastercard</p>
                    <p>
                      <span aria-hidden="true">•••• </span>
                      <span className="sr-only">Ending in </span>1545
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">
                    Shipping method
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <p>DHL</p>
                    <p>Takes up to 3 working days</p>
                  </dd>
                </div>
              </dl>

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
                <div className="flex justify-between">
                  <dt className="font-semibold text-gray-900">Subtotal</dt>
                  <dd className="text-gray-700">$36.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex font-semibold text-gray-900">
                    Discount
                    <span className="rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2">
                      STUDENT50
                    </span>
                  </dt>
                  <dd className="text-gray-700">-$18.00 (50%)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold text-gray-900">Shipping</dt>
                  <dd className="text-gray-700">$5.00</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-8 pb-10">
                  <dt className="font-semibold text-gray-900">Total</dt>
                  <dd className="font-semibold text-gray-900">$23.00</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6 mx-auto space-x-2 w-full flex sm:w-1/2">
            <Link href={"/shop"}>
              <button className="btn-ghost w-full">Shop</button>
            </Link>
            <Link href={"/"}>
              <button className="btn-ghost w-full">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default UserOrder;

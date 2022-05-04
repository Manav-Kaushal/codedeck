import React, { useState, useReducer, useEffect } from "react";
import Head from "next/head";
import {
  LocationMarkerIcon,
  MailIcon,
  MinusIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { SiPaytm } from "react-icons/si";
import { numberFormat } from "@utils/helpers";
import { EmptyCart } from "@components/EmptyCart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");

  console.log(formData);

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = {
      cart,
      subTotal,
      oid,
      email: formData.email,
      name: formData.fullName,
      address: formData.address,
      zipcode: formData.zipcode,
      phone: formData.phone,
    };

    // Get a transaction token
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let txnRes = await res.json();
    let txnToken = txnRes.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: subTotal,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    initiatePayment();
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  const handleChange = async (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  // todo: build better logic
  useEffect(() => {
    async function setCityState() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`);
      const pincodes = await res.json();

      if (Object.keys(pincodes).includes(formData.zipcode)) {
        setCity(pincodes[formData.zipcode][0]);
        setRegion(pincodes[formData.zipcode][1]);
      }
    }
    
    if (formData?.zipcode?.length === 6) {
      setCityState();
    } else {
      setCity("");
      setRegion("");
    }
  }, [formData.zipcode]);

  const areAllFieldsFilled =
    formData.email?.length > 0 &&
    formData.fullName?.length > 0 &&
    formData.address?.length > 0 &&
    formData.zipcode?.length == 6 &&
    formData.phone?.length == 10;

  if (Object.keys(cart).length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="bg-gray-100">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Your Shopping Cart
          </h2>
          {submitting && (
            <div>
              You are submitting the following:
              <ul>
                {Object.entries(formData).map(([name, value]) => (
                  <li key={name}>
                    <strong>{name}</strong>:{value.toString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 mt-8">
              <section className="bg-white p-4 w-full shadow-md select-none">
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    Contact information
                  </h2>
                  {submitting && <div>Submtting Form...</div>}
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="text-gray-900 block w-full border-gray-300 rounded-md pl-10 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-semibold text-primary">
                    Shipping information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName || ""}
                          onChange={handleChange}
                          autoComplete="given-name"
                          className="text-gray-900 block w-full border-gray-300 rounded-md pl-10 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LocationMarkerIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          autoComplete="street-address"
                          className="text-gray-900 block w-full border-gray-300 rounded-md pl-10 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="apartment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apartment, suite, etc.
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="apartment"
                          name="apartment"
                          value={formData.apartment || ""}
                          onChange={handleChange}
                          className="text-gray-900 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={city}
                          onChange={handleChange}
                          autoComplete="address-level2"
                          className="text-gray-900 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State/Province
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="region"
                          name="region"
                          value={region}
                          onChange={handleChange}
                          autoComplete="address-level1"
                          className="text-gray-900 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="zipcode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pin Code <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="zipcode"
                          name="zipcode"
                          value={formData.zipcode || ""}
                          onChange={handleChange}
                          autoComplete="zipcode"
                          maxLength={6}
                          className="text-gray-900 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 sm:text-sm">
                          +91
                        </div>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          maxLength={10}
                          autoComplete="tel"
                          className="text-gray-900 block w-full border-gray-300 rounded-md pl-10 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order summary */}
              <section className="mt-10 sm:mt-0 h-full">
                <div className="sidebar sticky top-32 bg-white p-4 w-full shadow-md select-none">
                  <h2 className="text-lg font-semibold text-primary">
                    Order summary
                  </h2>

                  <div className="mt-2">
                    <table width="100%" className="font-bold">
                      <tr>
                        <td width="50%" align="left">
                          Item
                        </td>
                        <td width="30%" align="center">
                          Qty
                        </td>
                        <td width="20%" align="right">
                          Total
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="mt-2 pb-2">
                    {Object.keys(cart).length === 0 && (
                      <div>Cart is empty..</div>
                    )}
                    <table width="100%">
                      {Object.keys(cart).map((k) => {
                        return (
                          <tr key={k}>
                            <td width="50%">
                              <div className="line-clamp-2">
                                {cart[k].name} ({cart[k].size}/{cart[k].variant}
                                )
                              </div>
                            </td>
                            <td width="30%" align="center">
                              <MinusIcon
                                className="w-6 h-6 inline-flex shadow-md border rounded-md p-1 cursor-pointer"
                                onClick={() =>
                                  removeFromCart(
                                    k,
                                    1,
                                    cart[k].price,
                                    cart[k].name,
                                    cart[k].size,
                                    cart[k].variant
                                  )
                                }
                              />
                              <span className="mx-2">{cart[k].qty}</span>
                              <PlusIcon
                                onClick={() =>
                                  addToCart(
                                    k,
                                    1,
                                    cart[k].price,
                                    cart[k].name,
                                    cart[k].size,
                                    cart[k].variant
                                  )
                                }
                                className="w-6 h-6 inline-flex shadow-md border rounded-md p-1 cursor-pointer"
                              />
                            </td>
                            <td width="20%" align="right">
                              {numberFormat(cart[k].price)}
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                  {Object.keys(cart).length !== 0 && (
                    <div className="flex justify-between mt-2 border-t pt-4">
                      <b className="bold">Subtotal</b>
                      <b>{numberFormat(subTotal)}</b>
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-4 mt-5">
                    <button
                      type="submit"
                      className="group btn-black w-full flex items-center justify-center transition-200 space-x-4 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:border-gray-500 disabled:text-gray-300"
                      disabled={!areAllFieldsFilled}
                    >
                      <span className="text-base">Pay</span>
                    </button>
                  </div>
                  <p className="group flex items-center space-x-1 text-xs my-2 font-semibold">
                    <span>Payments powered by</span>
                    <span>
                      <SiPaytm className="group-hover:text-[#00baf2] transition-200 w-7 h-7" />
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;

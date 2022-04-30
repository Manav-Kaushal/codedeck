import { ProductCard } from "@components/ProductCard";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import {
  HeartIcon,
  MinusSmIcon,
  PlusSmIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SeoContainer } from "@components/SeoContainer";
import Product from "models/Product";
import mongoose from "mongoose";
import { numberFormat } from "@utils/helpers";
import Image from "next/image";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Slug = ({ buyNow, addToCart, product, variants }) => {
  const router = useRouter();
  const { query } = router;
  const [open, setOpen] = useState(false);
  const [pincode, setPincode] = useState(null);
  const [isDeliverable, setIsDeliverable] = useState(null);
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const handlePincodeInputChange = (e) => {
    setPincode(e.target.value);
  };

  const refresh = (newColor, newSize) => {
    let url = `/product-view/${variants[newColor][newSize]["slug"]}`;
    window.location = url;
  };

  async function checkDeliveryByPincode() {
    const res = await fetch("http://localhost:4000/api/pincodes");
    const pincodes = await res.json();

    if (pincodes.includes(parseInt(pincode))) {
      setIsDeliverable(true);
    } else {
      setIsDeliverable(false);
    }
  }

  return (
    <>
      <SeoContainer title={product.title} description={product.description} />
      <main className="max-w-screen-xl mx-auto sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <div className="relative aspect-1 shadow-md">
              <Image
                src={product.imageSrc}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="shadow-md"
              />
            </div>
            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <p className="text-gray-400">CodeDeck</p>

              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-700 capitalize">
                {product.title} ({product.size} / {product.color})
              </h1>

              {/* Reviews */}
              {/* <div className="mt-2">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          5 > rating ? "text-primary" : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">(713 reviews)</p>
                </div>
              </div> */}

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  {product.discount ? (
                    <div className="flex items-end space-x-2">
                      <strike className="text-gray-400">
                        <small>{numberFormat(product.price)}</small>
                      </strike>
                      <h3 className="text-primary text-4xl">
                        {numberFormat(product.discount)}
                      </h3>
                    </div>
                  ) : null}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div className="w-full flex items-center space-x-16 mt-3">
                {/* Colors */}
                <div className="w-1/3">
                  <RadioGroup className="mt-2">
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {Object.keys(variants).includes("red") &&
                        Object.keys(variants["red"]).includes(size) && (
                          <button
                            type="button"
                            onClick={() => refresh("red", size)}
                            className={`bg-red-500 p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none h-8 w-8 border-2 ${
                              color === "red"
                                ? "border-gray-600"
                                : "border-gray-300"
                            }`}
                          />
                        )}
                      {Object.keys(variants).includes("blue") &&
                        Object.keys(variants["blue"]).includes(size) && (
                          <button
                            type="button"
                            onClick={() => refresh("blue", size)}
                            className={`bg-blue-500 p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none h-8 w-8 border-2 ${
                              color === "blue"
                                ? "border-gray-600"
                                : "border-gray-300"
                            }`}
                          />
                        )}
                      {Object.keys(variants).includes("black") &&
                        Object.keys(variants["black"]).includes(size) && (
                          <button
                            type="button"
                            onClick={() => refresh("black", size)}
                            className={`bg-black p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none h-8 w-8 border-2 ${
                              color === "black"
                                ? "border-gray-600"
                                : "border-gray-300"
                            }`}
                          />
                        )}
                      {Object.keys(variants).includes("green") &&
                        Object.keys(variants["green"]).includes(size) && (
                          <button
                            type="button"
                            onClick={() => refresh("green", size)}
                            className={`bg-green-500 p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none h-8 w-8 border-2 ${
                              color === "green"
                                ? "border-gray-600"
                                : "border-gray-300"
                            }`}
                          />
                        )}
                      {Object.keys(variants).includes("yellow") &&
                        Object.keys(variants["yellow"]).includes(size) && (
                          <button
                            type="button"
                            onClick={() => refresh("yellow", size)}
                            className={`bg-yellow-500 p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none h-8 w-8 border-2 ${
                              color === "yellow"
                                ? "border-gray-600"
                                : "border-gray-300"
                            }`}
                          />
                        )}
                    </div>
                  </RadioGroup>
                </div>

                {/* Size */}
                <div className="w-1/3 flex items-center flex-1 space-x-2">
                  <label
                    htmlFor="size"
                    className="text-gray-600 whitespace-pre"
                  >
                    Select Size:
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={size}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    onChange={(e) => refresh(color, e.target.value)}
                  >
                    {Object.keys(variants[color]).includes("S") && (
                      <option value="S">S</option>
                    )}
                    {Object.keys(variants[color]).includes("M") && (
                      <option value="M">M</option>
                    )}
                    {Object.keys(variants[color]).includes("L") && (
                      <option value="L">L</option>
                    )}
                    {Object.keys(variants[color]).includes("XL") && (
                      <option value="XL">XL</option>
                    )}
                    {Object.keys(variants[color]).includes("XXL") && (
                      <option value="XXL">XXL</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Pincode */}
              <div className="pincode mt-6 text-gray-700">
                <label htmlFor="postal-code" className="text-base">
                  Check Delivery
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="number"
                    name="postal-code"
                    id="postal-code"
                    value={pincode?.slice(0, 6)}
                    onChange={(e) => handlePincodeInputChange(e)}
                    autoComplete="postal-code"
                    className="focus:outline-none focus:ring-0 focus:border-gray-800 relative block w-56 rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                    placeholder="ZIP / Postal code"
                  />
                  <button
                    type="button"
                    className="btn-ghost transition-200 capitalize"
                    onClick={checkDeliveryByPincode}
                    disabled={pincode?.length === 0 ? true : false}
                  >
                    Check
                  </button>
                </div>
                {isDeliverable && isDeliverable != null && (
                  <div className="text-emerald-600 mt-2">
                    Product is deliverable to your location
                  </div>
                )}
                {!isDeliverable && isDeliverable != null && (
                  <div className="text-red-600 mt-2">
                    Sorry! we do not offer delivery services to your location.
                  </div>
                )}
              </div>

              <div className="mt-10 flex sm:flex-col-1 space-x-4">
                <button
                  className="max-w-xs flex-1 btn-black "
                  onClick={() =>
                    buyNow(
                      query.slug,
                      1,
                      product.discount ? product.discount : product.price,
                      product.title,
                      size,
                      color
                    )
                  }
                >
                  Buy Now
                </button>
                <button
                  className="max-w-xs flex-1 btn-black "
                  onClick={() => {
                    addToCart(
                      query.slug,
                      1,
                      product.discount ? product.discount : product.price,
                      product.title,
                      size,
                      color
                    );
                  }}
                >
                  Add to bag
                </button>
                {/* <button
                    type="button"
                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button> */}
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {/* {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name} defaultOpen>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-4 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-primary" : "text-gray-900",
                                  "text-lg font-semibold"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-primary group-hover:text-primary"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))} */}
                </div>
              </section>
            </div>
          </div>

          {/* <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              Customers also bought
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
              {relatedProducts.map((product) => (
                <ProductCard data={product} />
              ))}
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Slug;

import { ProductCard } from "@components/ProductCard";
import { HeartIcon, PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const tshirts = [
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    href: "apple-Watch-series-7",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "₹699",
    sale: true,
    discount: "₹499",
    color: "Black",
  },
  {
    id: 2,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    href: "apple-Watch-series-7",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "₹699",
    sale: true,
    discount: "₹499",
    color: "Black",
  },
  {
    id: 3,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    href: "apple-Watch-series-7",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "₹699",
    sale: true,
    discount: "₹499",
    color: "Black",
  },
  {
    id: 4,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    href: "apple-Watch-series-7",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "₹699",
    sale: true,
    discount: "₹499",
    color: "Black",
  },
  {
    id: 5,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    href: "apple-Watch-series-7",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "₹699",
    sale: true,
    discount: "₹499",
    color: "Black",
  },
  {
    id: 6,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    href: "apple-Watch-series-7",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "₹699",
    sale: false,
    discount: "₹499",
    color: "Black",
  },
];

const Tshirts = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-6 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
        {tshirts.map((tshirt) => (
          <Link href={`/product-view/${tshirt?.href}`}>
            <a>
              <ProductCard data={tshirt} category="T-shirts" />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tshirts;

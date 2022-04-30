import { ProductCard } from "@components/ProductCard";
import Link from "next/link";
import React from "react";

const caps = [
  {
    id: 1,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: true,
    discount: "₹549",
    color: "Black",
  },
  {
    id: 2,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: true,
    discount: "₹549",
    color: "Black",
  },
  {
    id: 3,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: true,
    discount: "₹549",
    color: "Black",
  },
  {
    id: 4,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: true,
    discount: "₹549",
    color: "Black",
  },
  {
    id: 5,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: true,
    discount: "₹549",
    color: "Black",
  },
  {
    id: 6,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: false,
    discount: "₹549",
    color: "Black",
  },
  {
    id: 7,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: false,
    discount: "₹549",
    color: "Black",
  },
  {
    id: 8,
    name: "Trucker Monkey",
    href: "black-trucker-baseball-monkey-cap",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405179/web/dummy/trucker-monkey-001-right_720x_tnungp.webp",
    imageAlt: "Trucker Monkey Cap",
    price: "₹789",
    sale: false,
    discount: "₹549",
    color: "Black",
  },
];

const Caps = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-6 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
        {/* {caps.map((cap) => (
          <Link href={`/product-view/${cap?.href}`}>
            <a>
              <ProductCard data={cap} category="caps" />
            </a>
          </Link>
        ))} */}
        Test
      </div>
    </div>
  );
};

export default Caps;

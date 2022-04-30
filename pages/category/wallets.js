import { ProductCard } from "@components/ProductCard";
import Link from "next/link";
import React from "react";

const wallets = [
  {
    id: 1,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: true,
    discount: "₹799",
    color: "Black",
  },
  {
    id: 2,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: true,
    discount: "₹799",
    color: "Black",
  },
  {
    id: 3,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: true,
    discount: "₹799",
    color: "Black",
  },
  {
    id: 4,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: true,
    discount: "₹799",
    color: "Black",
  },
  {
    id: 5,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: true,
    discount: "₹799",
    color: "Black",
  },
  {
    id: 6,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: false,
    discount: "₹799",
    color: "Black",
  },
  {
    id: 7,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: false,
    discount: "₹799",
    color: "Black",
  },
  {
    id: 8,
    name: "Hug Dealer Graphic Hoodie",
    href: "hug-dealer-graphic-hoodie",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/v1650405519/web/dummy/clothing-mockup-of-a-hoodie-mockup-on-a-hanger-a9153_4_740x_nxisny.webp",
    imageAlt: "Hug Dealer Graphic Hoodie Cap",
    price: "₹999",
    sale: false,
    discount: "₹799",
    color: "Black",
  },
];

const Wallets = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-6 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
        {/* {wallets.map((wallet) => (
          <Link href={`/product-view/${wallet?.href}`}>
            <a>
              <ProductCard data={wallet} category="wallets" />
            </a>
          </Link>
        ))} */}
        Test
      </div>
    </div>
  );
};

export default Wallets;

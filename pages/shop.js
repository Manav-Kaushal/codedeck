import Link from "next/link";
import React from "react";

const collections = [
  {
    name: "Tshirts",
    description: "Tshirts and Tops",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "/category/tshirts",
  },
  {
    name: "Hoodies",
    description: "Hoodies and Sweatshirts",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "/category/hoodies",
  },
  {
    name: "Caps",
    description: "Daily commute essentials",
    imageSrc:
      "https://res.cloudinary.com/codedeck/image/upload/g_south/v1651581719/web/dummy/ssrco_dad_hat_womens_000000_44f0b734a5_front_three_quarter_tall_portrait_750x1000-bg_f8f8f8.u1_ksblwf.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "/category/caps",
  },
  {
    name: "Wallets",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "/category/wallets",
  },
];

const shop = () => {
  return (
    <section aria-labelledby="collections-heading" className="bg-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto py-16 lg:max-w-none">
          <h2
            id="collections-heading"
            className="text-2xl font-extrabold text-gray-900"
          >
            Categories
          </h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
            {collections.map((collection) => (
              <Link key={collection.name} href={collection.href}>
                <a>
                  <div className="group relative">
                    <div className="relative w-full h-80 bg-white rounded-xl overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 shadow-md">
                      <img
                        src={collection.imageSrc}
                        alt={collection.imageAlt}
                        className="w-full h-full object-top object-cover scale-100 transition duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <span className="absolute inset-0" />
                      {collection.name}
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {collection.description}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default shop;

import { ProductCard } from "@components/ProductCard";
import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { SeoContainer } from "@components/SeoContainer";

const Tshirts = ({ products }) => {
  return (
    <>
      <SeoContainer
        title="Buy Best Coding Related Tshirts At Minimum Prices!"
        noPrefix
      />
      <div className="max-w-screen-2xl my-6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <Link key={product._id} href={`/product-view/${product.slug}`}>
              <a target="_blank">
                <ProductCard data={product} category="T-shirts" />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "tshirts" });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Tshirts;

import { ProductCard } from "@components/ProductCard";
import React from "react";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { SeoContainer } from "@components/SeoContainer";
import { EmptyProductList } from "@components/EmptyProductList";

const Tshirts = ({ products }) => {
  if (Object.keys(products).length === 0) {
    return <EmptyProductList />;
  }
  return (
    <>
      <SeoContainer
        title="Buy Best Coding Related Tshirts At Minimum Prices!"
        noPrefix
      />
      <div className="max-w-screen-2xl my-6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {Object.keys(products).map((item) => (
            <ProductCard
              key={products[item]._id}
              data={products[item]}
              category="T-shirts"
            />
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
  let tshirts = {};

  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirts;

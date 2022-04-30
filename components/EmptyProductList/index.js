import React from "react";
import Lottie from "react-lottie";
import animationData from "@static/products-not-found.json";

export const EmptyProductList = ({ size }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="max-w-screen-2xl my-6 mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Lottie
          options={defaultOptions}
          height={size === "sm" ? 150 : 400}
          width={size === "sm" ? 150 : 400}
        />
      </div>
      <div className="text-center space-y-6">
        <p className={`${size === "sm" ? "text-base" : "text-2xl"}`}>
          This is weird! No products found...
        </p>
      </div>
    </div>
  );
};

import React from "react";
import Lottie from "react-lottie";
import animationData from "@static/empty-cart.json";
import Link from "next/link";

export const EmptyCart = ({ size }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="grid place-items-center pb-10">
      <div>
        <Lottie
          options={defaultOptions}
          height={size === "sm" ? 150 : 400}
          width={size === "sm" ? 150 : 400}
        />
      </div>
      <div className="text-center space-y-6">
        <p className={`${size === "sm" ? "text-base" : "text-2xl"}`}>
          Oops! No items found.
        </p>
        <Link href={"/shop"}>
          <button className="btn-black">Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

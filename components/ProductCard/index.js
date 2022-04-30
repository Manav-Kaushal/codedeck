import { HeartIcon } from "@heroicons/react/outline";
import { numberFormat } from "@utils/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProductCard = ({ data, category }) => {
  return (
    <div className="group relative mx-auto select-none">
      {data.discountPercentage && data.discountPercentage > 0 && (
        <div className="sale-badge absolute top-2 left-2 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
            {data.discountPercentage}%
          </span>
        </div>
      )}
      <div className="max-w-sm rounded-lg border transition-200 shadow-sm group-hover:shadow-lg">
        <Link key={data._id} href={`/product-view/${data.slug}`}>
          <a>
            <div className="relative aspect-1">
              <Image
                className="rounded-t-lg aspect-1 object-contain mx-auto"
                src={data.imageSrc}
                alt={data.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </a>
        </Link>
        <div className="p-3 sm:p-5">
          <h4 className="text-sm uppercase m-0 text-gray-400">
            {category ? category : data.category}
          </h4>
          <Link key={data._id} href={`/product-view/${data.slug}`}>
            <a>
              <h5 className="text-base sm:text-lg font-semibold text-gray-600 line-clamp-1 leading-tight capitalize transition-200 group-hover:text-gray-900">
                {data.title}
              </h5>
            </a>
          </Link>
          <div className="mt-2 flex justify-between items-center font-medium">
            {data.discount ? (
              <p className="text-xl sm:text-2xl text-gray-400">
                <strike className="text-base sm:text-xl">
                  <small>{numberFormat(data.price)}</small>
                </strike>
                &nbsp;
                <span className="text-primary">
                  {numberFormat(data.discount)}
                </span>
              </p>
            ) : (
              <p className="text-xl sm:text-2xl text-gray-900">
                {numberFormat(data.price)}
              </p>
            )}
            <HeartIcon className="w-6 h-6 text-primary cursor-pointer" />
          </div>
          <div className="mt-2">
            <div className="flex items-center space-x-1">
              {data.color.includes("red") && (
                <div className="p-1 border border-red-400 rounded-full bg-red-500 aspect-1 w-6" />
              )}
              {data.color.includes("blue") && (
                <div className="p-1 border border-blue-400 rounded-full bg-blue-500 aspect-1 w-6" />
              )}
              {data.color.includes("black") && (
                <div className="p-1 border border-black rounded-full bg-black aspect-1 w-6" />
              )}
              {data.color.includes("green") && (
                <div className="p-1 border border-green-400 rounded-full bg-green-500 aspect-1 w-6" />
              )}
              {data.color.includes("yellow") && (
                <div className="p-1 border border-yellow-400 rounded-full bg-yellow-500 aspect-1 w-6" />
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 space-x-1">
              {data.size.includes("S") && (
                <span className="p-1 border border-gray-400 rounded-sm">S</span>
              )}
              {data.size.includes("M") && (
                <span className="p-1 border border-gray-400 rounded-sm">M</span>
              )}
              {data.size.includes("L") && (
                <span className="p-1 border border-gray-400 rounded-sm">L</span>
              )}
              {data.size.includes("XL") && (
                <span className="p-1 border border-gray-400 rounded-sm">
                  XL
                </span>
              )}
              {data.size.includes("XXL") && (
                <span className="p-1 border border-gray-400 rounded-sm">
                  XXL
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

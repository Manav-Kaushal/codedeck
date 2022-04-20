import { HeartIcon } from "@heroicons/react/outline";
import React from "react";

export const ProductCard = ({ data, category }) => {
  return (
    <div className="group relative mx-auto">
      <div className="max-w-sm rounded-lg border transition-200 group-hover:shadow-lg">
        <img
          className="rounded-t-lg aspect-1 object-contain"
          src={data.imageSrc}
          alt={data.name}
        />
        <div className="p-3 sm:p-5">
          <h4 className="text-sm uppercase m-0 text-gray-500">
            {category ? category : data.category}
          </h4>
          <h5 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1 leading-tight">
            {data.name}
          </h5>
          <div className="mt-2 flex justify-between items-center font-semibold">
            {data.sale ? (
              <p className="text-xl sm:text-2xl text-gray-400">
                <strike className="text-base sm:text-xl">
                  <small>{data.price}</small>
                </strike>
                &nbsp;
                <span className="text-primary">{data.discount}</span>
              </p>
            ) : (
              <p className="text-xl sm:text-2xl text-gray-900">{data.price}</p>
            )}
            <HeartIcon className="w-6 h-6 text-primary cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

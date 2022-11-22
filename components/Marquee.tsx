import React from "react";
import { ProductType } from "../types/types";
import { ProductCard } from "./ProductCard";

export const Marquee: React.FC<{ products: ProductType[] }> = ({
  products,
}) => {
  return (
    <div className="maylike-products-outercontainer">
      <h2>You may also like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          {products.map((i: any) => (
            <ProductCard key={i._id} product={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

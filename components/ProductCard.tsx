import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";


export const ProductCard: React.FC<{ product: any }> = ({
  product: { image, name, price, slug },
}) => {
  return (
    <Link href={`/product/${slug}`}>
      <div className="product-detail-container">
        {image ? (
          <img
            className="product-image"
            src={urlFor(image?.asset?._ref).url()}></img>
        ) : null}
        <div className="product-detail-desc">
          <h4>{name}</h4>
          <p className="product-detail-desc price"> {price} $</p>
        </div>
      </div>
    </Link>
  );
};






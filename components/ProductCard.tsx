import Link from "next/link";
import React, { useContext } from "react";
import { urlFor } from "../lib/client";
import { ProductType } from "../types/types";

export const ProductCard: React.FC<{ product: ProductType }> = ({
  product: { image, name, price, slug, description },
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
          <h1>{name}</h1>
          <h4>Price</h4>
          <p className="product-detail-desc price"> {price} $</p>
          <h4>Alergen information</h4>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

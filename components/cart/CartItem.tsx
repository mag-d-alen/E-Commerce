import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { urlFor } from "../../lib/client";
import { useStateContext } from "../../state/StateContext";
import { ProductType } from "../../types/types";

export const CartItem: React.FC<{ product: ProductType }> = ({ product }) => {
  const { quantity, name, price, image } = product;
  const { decreaseQuantity, increaseQuantity, totalQuantities, totalPrice } =
    useStateContext();
  return (
    <>
      <div className="flex ">
        <div className="small-image-container">
          <img
            className="small-image"
            src={urlFor(image.asset?._ref).url()}></img>
        </div>
        <h5>
          {quantity} x {name}
        </h5>
        <h4>${price}</h4>

        <p className="quantity-desc">
          <span className="minus" onClick={() => decreaseQuantity(product)}>
            <AiOutlineMinus />
          </span>
          <span className="num">{quantity}</span>
          <span className="plus" onClick={() => increaseQuantity(product)}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>
    </>
  );
};

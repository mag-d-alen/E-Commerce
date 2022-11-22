import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../styles/state/StateContext";
import { ProductType } from "../../types/types";

export const CartItem: React.FC<{ product: ProductType }> = ({ product }) => {
  const { quantity, name, price } = product;
  const { decreaseQuantity, increaseQuantity, totalQuantities, totalPrice } =
    useStateContext();
  return (
    <>
      <div className="cart-heading"></div>
      <div className="flex bottom">
        <h5>{name}</h5>
        <h4>${price}</h4>
        <h3>Quantity:{quantity}</h3>
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

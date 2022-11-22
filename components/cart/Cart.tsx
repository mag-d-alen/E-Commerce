import React, { useRef } from "react";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineShopping,
  AiOutlineFrown,
} from "react-icons/ai";
import { useStateContext } from "../../styles/state/StateContext";
import Link from "next/link";
import { CartItem } from "./CartItem";

export const Cart: React.FC = () => {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const { setShowCart, cartItems, totalPrice, totalQuantities } =
    useStateContext();

  return (
    <div className="cart-outercontainer" ref={cartRef}>
      <span className="cart-num-items">{totalQuantities} items</span>
      <div className="cart-container">
        <button className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
        </button>
        <span className=" cart-heading ">Your Cart</span>
        <div>
          {cartItems.length ? (
            cartItems?.map((item) => <CartItem key={item._id} product={item} />)
          ) : (
            <div className="empty-cart">
              <AiOutlineShopping size={100} />
              <div className="empty-cart-inner">
                <h3>Your cart is empty</h3> <AiOutlineFrown size={30} />
              </div>
            </div>
          )}
          <div className="cart-heading">Total price: ${totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

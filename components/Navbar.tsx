import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../state/StateContext";
import { Cart } from "./cart/Cart";
export const Navbar = () => {
  const { totalQuantities, setShowCart, showCart } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Fresh Tart</Link>
      </p>
      <div className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </div>
      {showCart ? <Cart /> : null}
    </div>
  );
};

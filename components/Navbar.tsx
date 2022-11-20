import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
export const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Fresh Tart</Link>
      </p>

      <div className="cart-icon"> <AiOutlineShopping/></div>
      <span className="cart-item-qty">1</span>
    </div>
  );
};

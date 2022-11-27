import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStateContext } from "../state/StateContext";
import { BsBagCheckFill } from "react-icons/bs";

const Success: React.FC = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className="success-container">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">
          Any comments or requests? Please email
          <a className="email" href="mailto:customerservece@freshtart.com">
            customerservece@freshtart.com
          </a>
        </p>
        <Link href={"/"}>
          <button className="btn">Continue shopping</button>
        </Link>
      </div>
    </div>
  );
};
export default Success;

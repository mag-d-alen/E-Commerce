import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineFrown,
} from "react-icons/ai";
import getStripe from "../../lib/getStripe";
import { useStateContext } from "../../state/StateContext";
import { CartItem } from "./CartItem";

export const Cart: React.FC = () => {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const { setShowCart, cartItems, totalPrice, totalQuantities } =
    useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const key = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });
      if (res.status != 200) return;
      else {
        const data = await res.json();
        if (data) toast.loading("Redirecting...");
        stripe?.redirectToCheckout({ sessionId: data.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-outercontainer" ref={cartRef}>
      <span className="cart-num-items">{totalQuantities} items</span>
      <div className="cart-container">
        <button className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
        </button>
        <span className="cart-heading ">Your Cart</span>

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
        <button className="btn" onClick={handleCheckout}>
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

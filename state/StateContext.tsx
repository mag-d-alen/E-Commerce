import React, { useContext, createContext, useState } from "react";
import { toast } from "react-hot-toast";
import ProductDetails from "../pages/product/[slug]";
import { StateContextInterface, ProductType } from "../types/types";

const defaultContext = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  quantity: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  setShowCart: (cart: boolean) => {},
  onAdd: (product: ProductType) => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {},
  setCartItems: () => {},
};
export const Context = createContext<StateContextInterface>(defaultContext);

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductType[] | []>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const onAdd = (product: ProductType) => {
    increaseQuantity(product);
    toast.success(
      `You currently have ${product.quantity} pieces of ${product?.name} in your cart`
    );
  };

  const increaseQuantity = (product: ProductType) => {
    product.quantity ? (product.quantity += 1) : (product.quantity = 1);
    setTotalQuantities((prev) => (prev += 1));
    setTotalPrice((prev) => (prev += product.price));
    const itemInCart = cartItems.find(
      (item: ProductType) => item._id === product._id
    );
    if (itemInCart) {
      const updatedItems = cartItems.map((item: ProductType) => {
        return item._id === product._id
          ? { ...item, quantity: product.quantity }
          : item;
      });
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  };

  const decreaseQuantity = (product: ProductType) => {
    product.quantity - 1 > 0 ? (product.quantity -= 1) : (product.quantity = 0);
    setTotalQuantities((prev) => (prev - 1 > 0 ? (prev -= 1) : 0));
    setTotalPrice((prev) =>
      prev - product.price > 0 ? (prev -= product.price) : 0
    );
    const itemInCart = cartItems.find(
      (item: ProductType) => item._id === product._id
    );
    if (itemInCart) {
      const updatedItems = cartItems.map((item: ProductType) => {
        return item._id === product._id
          ? { ...item, quantity: product.quantity }
          : item;
      });
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        setShowCart,
        setTotalPrice,
        setTotalQuantities,
        setCartItems,
      }}>
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);

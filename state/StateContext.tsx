import React, { useContext, createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { updateClassDeclaration } from "typescript";
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

  const updateCart = (product: ProductType) => {
    const itemInCart = cartItems.find(
      (item: ProductType) => item._id === product._id
    );
    if (itemInCart) {
      let updatedItems;
      if (product.quantity === 0)
        updatedItems = cartItems.filter(
          (item: ProductType) => item._id !== product._id
        );
      else {
        updatedItems = cartItems.map((item: ProductType) => {
          return item._id === product._id
            ? { ...item, quantity: product.quantity }
            : item;
        });
      }
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  };

  const increaseQuantity = (product: ProductType) => {
    product.quantity ? (product.quantity += 1) : (product.quantity = 1);
    setTotalQuantities((prev) => (prev += 1));
    setTotalPrice((prev) => (prev += product.price));
    updateCart(product);
  };

  const decreaseQuantity = (product: ProductType) => {
    product.quantity - 1 > 0 ? (product.quantity -= 1) : (product.quantity = 0);
    updateCart(product);

    setTotalQuantities((prev) => (prev - 1 > 0 ? (prev -= 1) : 0));
    setTotalPrice((prev) =>
      prev - product.price > 0 ? (prev -= product.price) : 0
    );
  };

  const onAdd = (product: ProductType) => {
    increaseQuantity(product);
    toast.success(
      `You currently have ${product.quantity} pieces of ${product?.name} in your cart`
    );
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
      {/*eslint-disable no-eval*/} {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);

import { ParsedUrlQuery } from "querystring";

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  image: any;
  details?: string;
  slug: string;
  quantity: number;
  description?: string;
};

export interface QueryParams extends ParsedUrlQuery {
  slug: string;
}
export interface Params extends ParsedUrlQuery {
  id: string;
}

export interface ProductDetailsInterface {
  product: ProductType[];
}

export interface StateContextInterface {
  showCart: boolean;
  cartItems: ProductType[] | [];
  totalPrice: number;
  totalQuantities: number;
  quantity: number;
  increaseQuantity: (product: ProductType) => void;
  decreaseQuantity: (product: ProductType) => void;
  onAdd: (product: ProductType) => void;
  setShowCart: (cart: boolean) => void;
  setTotalPrice: (price: number) => void;
  setTotalQuantities: (qty: number) => void;
  setCartItems: (items: ProductType[]) => void;
}

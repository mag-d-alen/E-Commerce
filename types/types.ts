import { ParsedUrlQuery } from "querystring";

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  image: any;
  details?: string;
  slug: string;
  quantity: number;
  requests?: string;
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
}

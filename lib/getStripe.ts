import { loadStripe, Stripe } from "@stripe/stripe-js";
const key = process.env.NEXT_PUBLIC_STRIPE_PUBL_KEY as string;
let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) stripePromise = loadStripe(key);
  return stripePromise;
};
export default getStripe;

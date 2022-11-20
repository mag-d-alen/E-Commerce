import { Footer } from "../components/Footer";
import { FooterBanner } from "../components/FooterBanner";
import { HeroBanner } from "../components/HeroBanner";

import { client } from "../lib/client";
import { ProductCard } from "../components/ProductCard";
import { Layout } from "../components/Layout";
import Link from "next/link";

const Home: React.FC<{ products: any }> = ({ products }) => {
  return (
    <>
      <HeroBanner />
      <div className="products-container">
        {products.map((p: any) => (
          <Link key={p.id} href={`/product/${p.name}`}>
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
   
    </>
  );
};

export const getServerSideProps = async () => {
  const productsQuery = '*[_type=="product"]';
  const products = await client.fetch(productsQuery);
  return {
    props: { products },
  };
};
export default Home;

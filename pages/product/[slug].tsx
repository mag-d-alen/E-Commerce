import React, { ReactElement } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { client, urlFor } from "../../lib/client";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

interface ProductDetailsInterface {
  product: {
    slug: string;
    image: any;
    name: string;
    price: number;
  };
}

const ProductDetails = ({ product }: ProductDetailsInterface): ReactElement => {
  return (
    <div className="product-detail-container">
      {product.image ? (
        <img
          className="product-detail-container product-detail-image"
          src={urlFor(product.image?.asset?._ref).url()}></img>
      ) : null}

      <div className="product-detail-desc">
        <h4>{ product.name}</h4>
        <p className="product-detail-desc price"> {product.price} $</p>
      </div>
    </div>
  );
};

export async function getStaticPaths(context: any) {
  const productsQuery = '*[_type=="product"]';
  const products = await client.fetch(productsQuery);
  return {
    paths: [
      {
        params: { slug: "belgianwaffle" },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  let { slug } = params;
  const productQuery = `*[_type=="product" && slug == "${slug}"]`;
  const product = await client.fetch(productQuery);
  return {
    props: { product: product[0] },
  };
}
export default ProductDetails;

import { client, urlFor } from "../../lib/client";
import { ProductType } from "../../types/types";
import { Marquee } from "../../components/Marquee";
import { useStateContext } from "../../state/StateContext";

const ProductDetails: React.FC<{
  product: ProductType;
  products: ProductType[];
}> = ({ product, products }) => {
  const { name, price, image } = product;
  const { onAdd, setShowCart } = useStateContext();
  const handleBuyNow = () => {
    onAdd(product);
    setShowCart(true);
  };
  return (
    <>
      <div className="product-detail-container">
        <img
          className="product-detail-container product-detail-image"
          src={urlFor(image?.asset?._ref).url()}></img>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <h4>Allergen information</h4>
          {/* <p>{details}</p> */}
          <p> {price} $</p>
          <div className="buttons">
            <button className=" btn buy-now" onClick={() => handleBuyNow()}>
              Buy Now
            </button>
            <button
              className=" btn add-to-cart"
              onClick={() => {
                onAdd(product);
              }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Marquee products={products} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: "belgian_waffle",
        },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const productsQuery = '*[_type=="product"]';
  const products = await client.fetch(productsQuery);
  let { slug } = params;

  const productQuery = `*[_type=="product" && slug == "${slug}"]`;
  const product = await client.fetch(productQuery);
  return {
    props: {
      product: product[0],
      products,
    },
  };
}
export default ProductDetails;

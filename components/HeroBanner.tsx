import Link from "next/link";
export const HeroBanner: React.FC = () => {
  return (
    <div className="hero-banner-container">
      <h1>Welcome to Fresh Tart</h1>
      <h3> The best online goodies shop</h3>

      <img className="hero-banner-image"></img>

      <div className="desc">
        <h5>description line</h5>
        <p>description para</p>
      </div>
      <Link href="/product/id">
        <button>ButtonText</button>
      </Link>
    </div>
  );
};

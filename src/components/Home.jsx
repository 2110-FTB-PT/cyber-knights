import HomeCarousel from "./HomeCarousel";
import HomeReviews from "./HomeReviews";

export default function Home({ products }) {
  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <h1>Welcome to PetRocks</h1>
      <div className="d-flex justify-content-center mx-3">
        <HomeCarousel products={products} />
        <HomeReviews products={products} />
      </div>
    </div>
  );
}

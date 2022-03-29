import HomeCarousel from "./HomeCarousel";

export default function Home({ products }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Welcom to PetRocks</h1>
      <div className="d-flex justify-content-center">
        <HomeCarousel products={products} />
      </div>
    </div>
  );
}

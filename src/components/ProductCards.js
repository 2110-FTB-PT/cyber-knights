import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../style/ProductCards.css";

export default function ProductCards({ product }) {
  const Navigate = useNavigate()
  return (
    <>
      {product && (
        <Card className="d-flex flex-column ">
          <Card.Header className="fs-1">{product.name}</Card.Header>
          <Card.Img variant='top' src={product.images[0].url}/>
          <Card.Body>
            <Card.Text className="text-center fs-5">${product.price}</Card.Text>
            <Button onClick={()=>Navigate(`/single-product/${product.id}`)}>More Details</Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

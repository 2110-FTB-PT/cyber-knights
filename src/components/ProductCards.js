import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../style/ProductCards.css";

export default function ProductCards({ product }) {
  const Navigate = useNavigate()
  return (
    <div>
      {product && (
        <Card className="shadow-lg">
          <Card.Header className="fs-4 text-center">{product.name}</Card.Header>
          <Card.Img style={{
            maxWidth:'400px',
            maxHeight:'400px',
            minWidth:'400px',
            minHeight:'400px',
          }} variant='top' src={product.images[0].url}/>
          <Card.Body className="product-card-button d-flex justify-content-center flex-column">
            <Card.Text className="text-center fs-2">${product.price}</Card.Text>
            <Button onClick={()=>Navigate(`/single-product/${product.id}`)}>More Details</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

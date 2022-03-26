import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../style/ProductCards.css'


export default function ProductCards({product}) {
  return(
    <>
       {product && (
        <Card className='d-flex flex-column '>
          <Card.Header className='fs-1'>{product.name}</Card.Header>
          <Card.Body>
            <Card.Title className='p-0 m-0 fw-bold'>{product.description}</Card.Title>
            <Card.Text className='text-center fs-5'>${product.price}</Card.Text>
            <Button>More Details</Button>
          </Card.Body>
        </Card>
      )}
    </>
  )
};

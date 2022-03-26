import Carousel from 'react-bootstrap/Carousel'

export default function Home() {
  return (
    <Carousel variant='dark' slide={false}>
      <Carousel.Item interval={10000} alt='First Slide'>
        <img
          src='https://i.imgur.com/FkSnnCL.jpeg'
          alt='Test Slide'
          className='w-100 d-block'
        />
        <Carousel.Caption>
          <h3>Testing this caption</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
            explicabo facere accusantium ea culpa nobis sunt non eaque animi,
            nesciunt nemo aliquid repudiandae rem neque cum adipisci eveniet
            temporibus? Beatae!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          src='https://i.imgur.com/4XO823i.jpeg'
          alt='Test Slide'
          className='w-100 d-block'
        />
        <Carousel.Caption>
          <h3>Testing this caption</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
            explicabo facere accusantium ea culpa nobis sunt non eaque animi,
            nesciunt nemo aliquid repudiandae rem neque cum adipisci eveniet
            temporibus? Beatae!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          src='https://i.imgur.com/byL9Ot0.jpeg'
          alt='Test Slide'
          className='w-100 d-block'
        />
        <Carousel.Caption>
          <h3>Testing this caption</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
            explicabo facere accusantium ea culpa nobis sunt non eaque animi,
            nesciunt nemo aliquid repudiandae rem neque cum adipisci eveniet
            temporibus? Beatae!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

const client = require('./client')
const {
  createUser,
  createProduct,
  createImage,
  createReview,
  createComment,
} = require('./')

const dropTables = async () => {
  try {
    console.log('Starting to drop tables')
    await client.query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS images;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    console.log('Dropped all tables!')
  } catch (err) {
    throw err
  }
}

const createTables = async () => {
  console.log('Starting to create tables....')
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255),
        price INT NOT NULL,
        "isPublic" BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE images(
        id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        "productId" INT REFERENCES products(id) NOT NULL,
        UNIQUE (id, "productId")
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        "userId" INT REFERENCES users(id) NOT NULL,
        "productId" INT REFERENCES products(id) NOT NULL,
        "isPublic" BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        comment VARCHAR(255) NOT NULL,
        "userId" INT REFERENCES users(id) NOT NULL,
        "reviewId" INT REFERENCES reviews(id) NOT NULL,
        "isPublic" BOOLEAN DEFAULT TRUE 
      );
    `)
    console.log('Created all tables')
  } catch (err) {
    throw err
  }
}

/**********************************inital db setup *******************************/

const createInitialUsers = async () => {
  console.log('Starting to create users.......')
  try {
    const initUsers = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ]

    // need to make the createUser function in /db/models/user.js
    const users = await Promise.all(initUsers.map(createUser))
    console.log('Users =>', users)
    console.log('Finished creating users!')
  } catch (err) {
    throw err
  }
}

const createInitProducts = async () => {
  console.log('Starting to create products')
  try {
    const initProducts = [
      {
        name: `Blue Beetle`,
        description: `Cute Blue Beetle Rock Pet`,
        price: `90`,
      },
      {
        name: ` Nite Owl`,
        description: `Cute Nite Owl Rock Pet`,
        price: `150`,
      },
      {
        name: `WatchDog`,
        description: `Cute WatchDog Rock Pet`,
        price: `30`,
      },
      {
        name: `Rocket`,
        description: `Cute Trash Panda Rock Pet`,
        price: `90`,
      },
    ]
    // createProduct needs to be created inside /db/models/product.js
    const products = await Promise.all(initProducts.map(createProduct))
    console.log('Products :>> ', products)
    console.log('Finished creating products!')
  } catch (err) {
    throw err
  }
}

const createInitImages = async () => {
  console.log('Storing image urls to db')
  try {
    const initImgs = [
      {
        description: `A cute litle blue beetle!`,
        url: `https://cdn.vox-cdn.com/thumbor/CSVLsIhgVcg9Pph6f6Vfa_j45s0=/0x0:509x771/920x613/filters:focal(215x346:295x426):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70004438/blue_beetle_movie_costume_concept_art.0.jpg`,
        productId: 1,
        isPublic: true,
      },
      {
        description: `A cute litle nite owl!`,
        url: `https://static.wikia.nocookie.net/watchmen/images/4/44/Nite_Owl_II_DC.jpg/revision/latest/top-crop/width/360/height/450?cb=20210123132624`,
        productId: 2,
        isPublic: true,
      },
      {
        description: `A cute litle WatchDog!`,
        url: `https://static2.cbrimages.com/wordpress/wp-content/uploads/2020/04/Watchdog-Man-patrol-from-One-Punch-Man-Cropped.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5`,
        productId: 3,
        isPublic: true,
      },
      {
        description: `A cute litle Trash Panda!`,
        url: `https://static0.srcdn.com/wordpress/wp-content/uploads/2021/01/Rocket-Raccoon-2.jpg`,
        productId: 4,
        isPublic: true,
      },
    ]

    // createImage will be in /db/models/images.js
    const images = await Promise.all(initImgs.map(createImage))
    console.log('Images :>> ', images)
    console.log('Images Created')
  } catch (err) {
    throw err
  }
}

const createInitReviews = async () => {
  console.log('Creating Initial Reviews')
  try {
    const initReviews = [
      {
        title: `WOW CUTE`,
        description: `This is the cutest little PET ROCK! 1`,
        userId: 1,
        productId: 1,
        isPublic: true,
      },
      {
        title: `WOW CUTE`,
        description: `This is the cutest little PET ROCK! 2`,
        userId: 3,
        productId: 2,
        isPublic: true,
      },
      {
        title: `WOW CUTE`,
        description: `This is the cutest little PET ROCK! 3`,
        userId: 2,
        productId: 3,
        isPublic: true,
      },
      {
        title: `WOW CUTE`,
        description: `This is the cutest little PET ROCK! 4`,
        userId: 1,
        productId: 4,
        isPublic: true,
      },
      {
        title: `wowSOOO CUTE`,
        description: `CUTE CUTE CUTE CUTE`,
        userId: 1,
        productId: 4,
        isPublic: true,
      },
    ]

    // createReview inside /db/models/reviews.js
    const reviews = await Promise.all(initReviews.map(createReview))
    console.log('Reviews :>> ', reviews)
    console.log('Finished Creating Reviews')
  } catch (err) {
    throw err
  }
}

const createInitComments = async () => {
  console.log('Creating Initial Comments')
  try {
    const initComments = [
      {
        comment: `You are so RIGHT! 1`,
        userId: 3,
        reviewId: 1,
        isPublic: true,
      },
      {
        comment: `You are so RIGHT! 2`,
        userId: 3,
        reviewId: 2,
        isPublic: true,
      },
      {
        comment: `You are so RIGHT! 3`,
        userId: 2,
        reviewId: 3,
        isPublic: true,
      },
      {
        comment: `You are so RIGHT! 4`,
        userId: 1,
        reviewId: 4,
        isPublic: true,
      },
      {
        comment: `You are so RIGHT! 5`,
        userId: 2,
        reviewId: 1,
        isPublic: true,
      },
      {
        comment: `This is a comment`,
        userId: 2,
        reviewId: 5,
        isPublic: true,
      },
    ]

    // createComment inside /db/models/comments.js
    const comments = await Promise.all(initComments.map(createComment))
    console.log('Comments :>> ', comments)
    console.log('Finished Creating Comments')
  } catch (err) {
    throw err
  }
}

const rebuildDB = async () => {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitProducts()
    await createInitImages()
    await createInitReviews()
    await createInitComments()
  } catch (err) {
    throw err
  }
}

module.exports = { rebuildDB }

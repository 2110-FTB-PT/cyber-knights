const client = require("./client");
const {
  createUser,
  createProduct,
  createProductImage,
  createReview,
  createComment,
} = require("./");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS review_images;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS product_images;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    console.log("Dropped all tables!");
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  console.log("Starting to create tables....");
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT FALSE
      );


      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255),
        price INT NOT NULL,
        "isPublic" BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE product_images(
        id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        "productId" INT REFERENCES products(id) NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        "userId" INT REFERENCES users(id) NOT NULL,
        "productId" INT REFERENCES products(id) NOT NULL,
        "isPublic" BOOLEAN DEFAULT TRUE
      );
        
      CREATE TABLE review_images(
        id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL, 
        "reviewId" INT REFERENCES reviews(id) NOT NULL
      );

      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        comment VARCHAR(255) NOT NULL,
        "userId" INT REFERENCES users(id) NOT NULL,
        "reviewId" INT REFERENCES reviews(id) NOT NULL,
        "isPublic" BOOLEAN DEFAULT TRUE 
      );
    `);
    console.log("Created all tables");
  } catch (err) {
    throw err;
  }
};

/**********************************inital db setup *******************************/

const createInitialUsers = async () => {
  console.log("Starting to create users.......");
  try {
    const initUsers = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
      { username: "theBoss", password: "imTheBoss", admin: true },
    ];

    // need to make the createUser function in /db/models/user.js
    const users = await Promise.all(initUsers.map(createUser));
    console.log("Users =>", users);
    console.log("Finished creating users!");
  } catch (err) {
    throw err;
  }
};

const createInitProducts = async () => {
  console.log("Starting to create products");
  try {
    const initProducts = [
      {
        name: `Blue Beetle`,
        description: `Cute Blue Beetle Rock Pet`,
        price: `90`,
        isPublic: true,
      },
      {
        name: ` Nite Owl`,
        description: `Cute Nite Owl Rock Pet`,
        price: `150`,
        isPublic: true,
      },
      {
        name: `WatchDog`,
        description: `Cute WatchDog Rock Pet`,
        price: `30`,
        isPublic: true,
      },
      {
        name: `Rocket`,
        description: `Cute Trash Panda Rock Pet`,
        price: `90`,
        isPublic: true,
      },
<<<<<<< HEAD
      {
        name: `Panda Pet-rock`,
        description: ` This panda warrior has been known to be the guardian of a valley in a remote place in his native country.
        He has faced fearsome oponents such as the most feared tiger from the area, the most controlling and evil peckok and a 
        almost came back from deth bufalo. Even though this oponents were trying to kill him he was able to overcome them and 
        grow as a panda. Nowdays he is waiting on being able to get a home where he can share that groth with you.`,
        price: `300`,
        isPublic: true,
      },
      {
        name: `Fish pet-rock`,
        description: `This pet rock was born with an abnormal condition. He lacks the ability swim properly. Even with the harsh of life
        and not being able to live a normal life, this pet-rock has taken advantage of his disability and was able to help his friends
        in the fish tank to escape once. He was also very skilled and was able to navigate himself and find a lost friend. He has not been 
        more happy and protected ever since his friend brough shark friends.`,
        price: `45`,
        isPublic: true,
      },
      {
        name: `Elephant pet-rock`,
        description: `This elephant pet rock was saved from a terrible circus. He was separated from his mother when just a baby and 
        was forced to work with the clowns. The only other animals he would interact with was with mice. He was able to find his real talent
        inside the circus he would still prefer to find a home along you to have the real feeling of family again.`,
        price: `450`,
        isPublic: true,
      },
      {
        name: `Turtle pet-rock`,
        description: `This turtle pet rock is as tough in the inside as it is in the outside. He has learned thru the basics of nature that 
        life is not fair. In comparison with other relatives, his race in life started too early to even know what he was supposed to do, and 
        even though now he has come along to the idea of going with the flow instead of fighting it, he is now just discovering the joy of 
        finding what a real family is.`,
        price: `295`,
        isPublic: true,
      },
      {
        name: `Buterfly pet-rock`,
        description: `This cute buterfy is not what it used to be. Her as many, were born with a shape and characteristics that were not what 
        were desired, However time has runned its course and has gone thrugh a metamorphosis on the inside and outside. Now it has reached 
        the desired form and even after such transformation it has come to belive that it was nothing compared to what it had to go through 
        to be able to consider herself beutiful. She will be happy to be with you and show you that beauty will come from the inside.`,
        price: `380`,
        isPublic: true,
      },
    ];
=======
    ]
>>>>>>> 32f872965272a6a3d538df782f46f9268f69e8b6
    // createProduct needs to be created inside /db/models/product.js
    const products = await Promise.all(initProducts.map(createProduct));
    console.log("Products :>> ", products);
    console.log("Finished creating products!");
  } catch (err) {
    throw err;
  }
};

const createInitImages = async () => {
  console.log("Storing image urls to db");
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
<<<<<<< HEAD
      {
        description: `Dog pet-rock!`,
        url: `https://res.cloudinary.com/dwhglrnlw/image/upload/v1648444000/dog_pet_rock_toom90.jpg`,
        productId: 5,
        isPublic: true,
      },
      {
        description: `Panda Pet-rock!`,
        url: `https://res.cloudinary.com/dwhglrnlw/image/upload/v1648447398/panda_pet-rock_ptewvx.jpg`,
        productId: 6,
        isPublic: true,
      },
      {
        description: `Fish pet-rock!`,
        url: `https://res.cloudinary.com/dwhglrnlw/image/upload/v1648447398/fish_pet-rock_fevjt1.jpg`,
        productId: 7,
        isPublic: true,
      },
      {
        description: `Elephant pet-rock!`,
        url: `https://res.cloudinary.com/dwhglrnlw/image/upload/v1648447398/elephant_pet-rock_h5mosh.jpg`,
        productId: 8,
        isPublic: true,
      },
      {
        description: `Turtle pet-rock!`,
        url: `https://res.cloudinary.com/dwhglrnlw/image/upload/v1648447434/turtle_pet-rock_vaskcv.jpg`,
        productId: 9,
        isPublic: true,
      },
      {
        description: `Buterfly pet-rock!`,
        url: `https://res.cloudinary.com/dwhglrnlw/image/upload/v1648447410/buterfly_pet-rock_zw1but.jpg`,
        productId: 10,
        isPublic: true,
      },
    ];
=======
    ]
>>>>>>> 32f872965272a6a3d538df782f46f9268f69e8b6

    // createImage will be in /db/models/images.js
    const images = await Promise.all(initImgs.map(createProductImage));
    console.log("Images :>> ", images);
    console.log("Images Created");
  } catch (err) {
    throw err;
  }
};

const createInitReviews = async () => {
  console.log("Creating Initial Reviews");
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
    ];

    // createReview inside /db/models/reviews.js
    const reviews = await Promise.all(initReviews.map(createReview));
    console.log("Reviews :>> ", reviews);
    console.log("Finished Creating Reviews");
  } catch (err) {
    throw err;
  }
};

const createInitComments = async () => {
  console.log("Creating Initial Comments");
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
    ];

    // createComment inside /db/models/comments.js
    const comments = await Promise.all(initComments.map(createComment));
    console.log("Comments :>> ", comments);
    console.log("Finished Creating Comments");
  } catch (err) {
    throw err;
  }
};

const rebuildDB = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitProducts();
    await createInitImages();
    await createInitReviews();
    await createInitComments();
  } catch (err) {
    throw err;
  }
};

module.exports = { rebuildDB };

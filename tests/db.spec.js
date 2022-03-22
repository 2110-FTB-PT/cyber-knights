require('dotenv').config()
const { rebuildDB } = require('../db/seedData')
const bcrypt = require('bcrypt')

const {
  createUser,
  getUser,
  getUserById,
  createProduct,
  getAllPublicProducts,
  getAllProducts,
  getProductById,
  createImage,
  getAllImages,
  createReview,
  getReviewsByUser,
  getPublicReviewsByUser,
  getReviewById,
  getReviewsByProduct,
  updateReview,
  createComment,
  getAllComments,
  getCommentsByReview,
  getUserByUsername,
  getPublicReviewsByProduct,
} = require('../db')
const client = require('../db/client')

describe('Database', () => {
  beforeAll(async () => {
    await rebuildDB()
  })
  afterAll(async () => {
    await client.end()
  })

  describe('Users', () => {
    let userToCreate, queriedUser
    let userCredentials = {
      username: 'BarryAllen',
      password: 'scarletSpeedster',
    }
    describe('createUser({ username, password })', () => {
      beforeAll(async () => {
        userToCreate = await createUser(userCredentials)
        const {
          rows: [user],
        } = await client.query(
          `
          SELECT * FROM users 
          WHERE username = $1;
        `,
          [userCredentials.username]
        )
        queriedUser = user
      })
      it('Creates the user', async () => {
        expect(userToCreate.username).toEqual(userCredentials.username)
        expect(queriedUser.username).toEqual(userCredentials.username)
      })
      it('Does not store plain text password', async () => {
        expect(queriedUser.password).not.toEqual(userCredentials.password)
      })
      it('Hashes password before storing (salted 10 times)', async () => {
        const hashedVersion = bcrypt.compareSync(
          userCredentials.password,
          queriedUser.password
        )
        expect(hashedVersion).toEqual(true)
      })
      it('Does NOT return the password', async () => {
        expect(userToCreate.password).toBeFalsy()
      })
    })
    describe('getUser({ username, password })', () => {
      let verifiedUser
      beforeAll(async () => {
        verifiedUser = await getUser(userCredentials)
      })
      it('(Optional)Verifies the passed in, plain text password against the db hash password', async () => {
        const verifyPassword = bcrypt.compareSync(
          userCredentials.password,
          queriedUser.password
        )
        expect(verifyPassword).toBeTruthy()
        expect(verifiedUser).toBeTruthy()
        expect(verifiedUser.username).toEqual(userCredentials.username)
      })
      it('Does NOT return the password', async () => {
        expect(verifiedUser.password).toBeFalsy()
      })
      it('Throws custom Error message', async () => {
        const errMessage = {
          name: `IncorrectPassword`,
          message: `Password provided was incorrect, Please try again`,
        }
        await getUser({
          username: userCredentials.username,
          password: 'failingPassword',
        })
          .then((response) => {
            expect(response).toContainsEqual(errMessage)
          })
          .catch((e) => expect(e).toEqual(errMessage))
      })
    })
    describe('getUserByUsername(username)', () => {
      it('Grabs user by their username', async () => {
        const user = await getUserByUsername(userCredentials.username)
        expect(user).toBeTruthy()
        expect(user.username).toEqual(userCredentials.username)
      })
    })
    describe('getUserById(userId)', () => {
      it('Grabs user by their id', async () => {
        const user = await getUserById(queriedUser.id)
        queriedUser = user
        expect(user).toBeTruthy()
        expect(user.username).toEqual(userCredentials.username)
      })
      it('Does NOT return the password!', async () => {
        expect(queriedUser.password).toBeFalsy()
      })
    })
  })
  describe('Product', () => {
    describe('getAllProducts', () => {
      it('selects and returns an array of all products', async () => {
        const products = await getAllProducts()
        const { rows: queriedProducts } = await client.query(`
          SELECT * FROM products;
        `)
        expect(products).toEqual(queriedProducts)
      })
    })
    describe('createProduct({ name, description, price})', () => {
      it('Creates and returns the new Product', async () => {
        const productToCreate = {
          name: `Spider-Rock`,
          description: `the real hero of the spider-verse`,
          price: `50`,
          isPublic: true,
        }
        const createdProduct = await createProduct(productToCreate)
        expect(createdProduct.name).toEqual(productToCreate.name)
        expect(createdProduct.description).toEqual(productToCreate.description)
      })
    })
    describe('getAllPublicProducts()', () => {
      it('grabs all public products and returns them in an array', async () => {
        const pubProducts = await getAllPublicProducts()
        const { rows: queriedPubProducts } = await client.query(`
        SELECT * 
        FROM products
        WHERE "isPublic" = true;
      `)
        expect(pubProducts).toEqual(queriedPubProducts)
      })
    })
    describe('getProductById(productId)', () => {
      it(`Returns product object`, async () => {
        const singleProduct = await getProductById(4)
        expect(singleProduct).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            isPublic: expect.any(Boolean),
            description: expect.any(String),
            price: expect.any(Number),
          })
        )
      })
    })
  })
  describe('Images', () => {
    describe('getAllImages', () => {
      it('Selects and returns an array of all Images', async () => {
        const images = await getAllImages()
        const { rows: queriedImages } = await client.query(`
        SELECT * FROM images;
      `)
        expect(images).toEqual(queriedImages)
      })
    })
    describe('createImage({ description, url, productId})', () => {
      it('Creates and returns the Image object', async () => {
        const createNewImg = {
          description: `like spider-ham...but a rock`,
          url: `https://i.pinimg.com/564x/7f/9c/52/7f9c5231995b5f79da24ae6f3795c0ce.jpg`,
          productId: 5,
        }
        const createdImage = await createImage(createNewImg)
        expect(createdImage.description).toEqual(createNewImg.description)
        expect(createdImage.url).toEqual(createNewImg.url)
        expect(createdImage.productId).toEqual(createNewImg.productId)
      })
    })
  })
  describe('Reviews', () => {
    let reviewToCheck, quieredReview
    describe('createReview({ title, description, userId, productId })', () => {
      it('Creates and returns new review', async () => {
        const createNewReview = {
          title: 'BEST PET ROCK YET!',
          description: `I bought this pet rock a week ago, and Even though I haven't received it yet, I already know it will be the best pet ever!`,
          userId: 4,
          productId: 5,
          isPublic: true,
        }
        const createdReview = await createReview(createNewReview)
        reviewToCheck = createdReview
        expect(createdReview.title).toEqual(createNewReview.title)
        expect(createdReview.description).toEqual(createNewReview.description)
        expect(createdReview.userId).toEqual(createNewReview.userId)
        expect(createdReview.productId).toEqual(createNewReview.productId)
      })
    })
    describe('getReviewById(reviewId)', () => {
      it(`Gets a review by it's id number`, async () => {
        const reviewById = await getReviewById(reviewToCheck.id)
        expect(reviewById).toBeTruthy()
        expect(reviewById.title).toEqual(reviewToCheck.title)
        expect(reviewById.description).toEqual(reviewToCheck.description)
      })
      it(`returns with creatorName from the users table`, async () => {
        const reviewById = await getReviewById(reviewToCheck.id)
        expect(reviewById).toBeTruthy()
        expect(reviewById).toEqual(
          expect.objectContaining({ creatorName: expect.any(String) })
        )
      })
    })
    describe('getReviewsByProduct(productId)', () => {
      let productToCheck
      it('Gets all reviews for a specific project and returns them as an array', async () => {
        const createNewReview = {
          title: 'WoW so FETCH',
          description: 'this is the fetchest pet rock',
          userId: 4,
          productId: 4,
          isPublic: false,
        }
        await createReview(createNewReview)
        const productReviews = await getReviewsByProduct(4)
        productToCheck = productReviews
        productReviews.forEach((review) =>
          expect(review).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              creatorName: expect.any(String),
              title: expect.any(String),
              isPublic: expect.any(Boolean),
              description: expect.any(String),
              productId: expect.any(Number),
              comments: expect.any(Array),
            })
          )
        )
      })
      it('Return only public reviews', async () => {
        const productReviews = await getReviewsByProduct(4)
        productReviews.forEach(({ isPublic }) => expect(isPublic).toBeTruthy())
      })
    })
    describe('getPublicReviewsByUser(userId)', () => {
      it('gets all public reviews by a single user', async () => {
        const reviewsByUser = await getPublicReviewsByUser(1)
        expect(reviewsByUser).toBeTruthy()
        reviewsByUser.forEach(({ isPublic }) => expect(isPublic).toBeTruthy())
      })
    })
    describe('getReviewsByUser(userId)', () => {
      it('gets all reviews by a single user', async () => {
        const reviewsByUser = await getReviewsByUser(4)
        expect(reviewsByUser).toBeTruthy()
        reviewsByUser.forEach((review) =>
          expect(review).toEqual(
            expect.objectContaining({
              isPublic: expect.any(Boolean),
            })
          )
        )
      })
    })
    describe('updateReview', () => {
      it('updates an existing review', async () => {
        const updateInfo = {
          title: 'title',
          reviewId: 1,
          description: 'description',
        }
        quieredReview = reviewToCheck
        const updatedReview = await updateReview(quieredReview)
        expect(updatedReview).toBeTruthy()
        expect(updatedReview).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            isPublic: expect.any(Boolean),
            description: expect.any(String),
            productId: expect.any(Number),
            comments: expect.any(Array),
          })
        )
      })
    })
  })
  describe('Comments', () => {
    describe('createComment({ title, description, userId, productId })', () => {
      const createNewComment = {
        comment: `SAME CAN'T WAIT for it to show up!`,
        userId: 4,
        reviewId: 5,
        isPublic: true,
      }
      it('Creates and returns new Comment', async () => {
        const createdComment = await createComment(createNewComment)
        expect(createdComment.comment).toEqual(createNewComment.comment)
        expect(createdComment.userId).toEqual(createNewComment.userId)
        expect(createdComment.reviewId).toEqual(createNewComment.reviewId)
      })
    })
    describe('getCommentsByReview(reviewId)', () => {
      it('Returns an array of all comments for a review', async () => {
        const review = await getReviewById(1)
        const comments = await getCommentsByReview(1)
        expect(comments).toEqual(review.comments)
      })
    })
  })
})

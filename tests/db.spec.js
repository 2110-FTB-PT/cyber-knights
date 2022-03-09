require('dotenv').config()
const { rebuildDB } = require('../db/seedData')
const bcrypt = require('bcrypt')

const {
  createUser,
  getUser,
  createProduct,
  getAllPublicProducts,
  getAllProducts,
  createImage,
  getAllImages,
  createReview,
  getReviewById,
  createComment,
  getAllComments,
  getUserByUsername,
} = require('../db')
const client = require('../db/client')
const { errorMonitor } = require('pg/lib/query')

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
        expect(userToCreate.username).toBe(userCredentials.username)
        expect(queriedUser.username).toBe(userCredentials.username)
      })
      it('Does not store plain text password', async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password)
      })
      it('Hashes password before storing (salted 10 times)', async () => {
        const hashedVersion = bcrypt.compareSync(
          userCredentials.password,
          queriedUser.password
        )
        expect(hashedVersion).toBe(true)
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
        expect(verifiedUser.username).toBe(userCredentials.username)
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
            console.log('Data captured: ', response)
            expect(response).toContainsEqual(errMessage)
          })
          .catch((e) => expect(e).toEqual(errMessage))
      })
    })
    describe('getUserByUsername(username)', () => {
      it('Grabs user by their username', async () => {
        const user = await getUserByUsername(userCredentials.username)
        expect(user).toBeTruthy()
        expect(user.username).toBe(userCredentials.username)
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
        }
        const createdProduct = await createProduct(productToCreate)
        expect(createdProduct.name).toBe(productToCreate.name)
        expect(createdProduct.description).toBe(productToCreate.description)
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
        expect(createdImage.description).toBe(createNewImg.description)
        expect(createdImage.url).toBe(createNewImg.url)
        expect(createdImage.productId).toBe(createNewImg.productId)
      })
    })
  })
  describe('Reviews', () => {
    describe('createReview({ title, description, userId, productId })', () => {
      it('Creates and returns new review', async () => {
        const createNewReview = {
          title: 'BEST PET ROCK YET!',
          description: `I bought this pet rock a week ago, and Even though I haven't received it yet, I already know it will be the best pet ever!`,
          userId: 4,
          productId: 5,
        }
        const createdReview = await createReview(createNewReview)
        expect(createdReview.title).toBe(createNewReview.title)
        expect(createdReview.description).toBe(createNewReview.description)
        expect(createdReview.userId).toBe(createNewReview.userId)
        expect(createdReview.productId).toBe(createNewReview.productId)
      })
    })
    describe('getReviewById(reviewId)', () => {
      it(`Gets a routine by it's id number`, async () => {
        const reviewById = await getReviewById(1)
        expect(reviewById).toBeTruthy
      })
    })
  })
  describe('Comments', () => {
    describe('createComment({ title, description, userId, productId })', () => {
      const createNewComment = {
        comment: `SAME CAN'T WAIT for it to show up!`,
        userId: 4,
        reviewId: 5,
      }
      it('Creates and returns new Comment', async () => {
        const beforeCreateComment = await getAllComments()
        const createdComment = await createComment(createNewComment)
        const afterCreateComment = await getAllComments()
        expect(createdComment.comment).toBe(createNewComment.comment)
        expect(createdComment.userId).toBe(createNewComment.userId)
        expect(createdComment.reviewId).toBe(createNewComment.reviewId)
        expect(beforeCreateComment.length).toBeLessThan(
          afterCreateComment.length
        )
      })
      it('after being created shows up in all comments', async () => {
        const beforeCreateComment = await getAllComments()
        await createComment(createNewComment)
        const afterCreateComment = await getAllComments()
        expect(beforeCreateComment.length).toBeLessThan(
          afterCreateComment.length
        )
      })
    })
  })
})

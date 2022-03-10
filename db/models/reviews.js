const client = require('../client')
const { getCommentsByReview } = require('./comments')

const createReview = async ({
  title,
  description,
  userId,
  productId,
  isPublic,
}) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      INSERT INTO reviews(title, description, "userId", "productId", "isPublic")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [title, description, userId, productId, isPublic]
    )

    return review
  } catch (err) {
    throw err
  }
}

const getReviewById = async (reviewId) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      SELECT *
      FROM reviews
      WHERE id = $1;
    `,
      [reviewId]
    )

    const { rows: comments } = await client.query(
      `
      SELECT *
      FROM comments
      WHERE "reviewId" = $1;
    `,
      [reviewId]
    )

    review.comments = comments

    return review
  } catch (err) {
    throw err
  }
}

const getPublicReviewsByProduct = async (productId) => {
  try {
    const { rows: productReviews } = await client.query(
      `
      SELECT *
      FROM reviews
      WHERE "productId" = $1 
      AND "isPublic" = TRUE
    `,
      [productId]
    )

    for (let i = 0; i < productReviews.length; i++) {
      const currReview = productReviews[i]
      currReview.comments = await getCommentsByReview(currReview.id)
    }

    return productReviews
  } catch (err) {
    throw err
  }
}

const getReviewsByProduct = async (productid) => {
  try {
    const { rows: productReviews } = await client.query(
      `
      SELECT *
      FROM reviews
      WHERE "productId" = $1 
    `,
      [productId]
    )

    for (let i = 0; i < productReviews.length; i++) {
      const currReview = productReviews[i]
      currReview.comments = await getCommentsByReview(currReview.id)
    }

    return productReviews
  } catch (err) {
    throw err
  }
}

const getReviewsByUser = async (userId) => {
  try {
    const { rows: reviews } = await client.query(
      `
      SELECT * 
      FROM reviews
      WHERE "userId" = $1;
    `,
      [userId]
    )

    for (let i = 0; i < reviews.length; i++) {
      const currReview = reviews[i]
      currReview.comments = await getCommentsByReview(currReview.id)
    }

    console.log(reviews)
    return reviews
  } catch (err) {
    throw err
  }
}

module.exports = {
  createReview,
  getPublicReviewsByProduct,
  getReviewsByProduct,
  getReviewById,
  getReviewsByUser,
}

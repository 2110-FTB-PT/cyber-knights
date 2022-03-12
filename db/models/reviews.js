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
      SELECT r.id, r."userId", r."isPublic", r.title, r.description, u.username AS "creatorName" 
      FROM reviews r
      JOIN users u ON r."userId" = u.id
      WHERE r.id = $1;
    `,
      [reviewId]
    )

    review.comments = await getCommentsByReview(reviewId)

    return review
  } catch (err) {
    throw err
  }
}

const getPublicReviewsByProduct = async (productId) => {
  try {
    const { rows: productReviews } = await client.query(
      `
      SELECT r.id, r."userId", r."isPublic", r.title, r.description, u.username AS "creatorName" 
      FROM reviews r
      JOIN users u ON r."userId" = u.id
      WHERE r."productId" = $1 
      AND r."isPublic" = TRUE
    `,
      [productId]
    )

    await addCommentsToReviews(productReviews)

    return productReviews
  } catch (err) {
    throw err
  }
}

const getReviewsByProduct = async (productId) => {
  try {
    const { rows: productReviews } = await client.query(
      `
      SELECT r.id, r."productId", r."isPublic", r.title, r.description, u.username AS "creatorName" 
      FROM reviews r
      JOIN users u ON r."userId" = u.id
      WHERE r."productId" = $1
      AND "isPublic" = true 
    `,
      [productId]
    )

    await addCommentsToReviews(productReviews)

    return productReviews
  } catch (err) {
    throw err
  }
}

const getReviewsByUser = async (userId) => {
  try {
    const { rows: reviews } = await client.query(
      `
      SELECT r.id, r."userId", r."isPublic", r.title, r.description, u.username AS "creatorName" 
      FROM reviews r
      JOIN users u ON r."userId" = u.id
      WHERE r."userId" = $1;
    `,
      [userId]
    )

    await addCommentsToReviews(reviews)

    return reviews
  } catch (err) {
    throw err
  }
}

const getPublicReviewsByUser = async (userId) => {
  try {
    const { rows: reviews } = await client.query(
      `
      SELECT r.id, r."userId", r."isPublic", r.title, r.description, u.username AS "creatorName" 
      FROM reviews r
      JOIN users u ON r."userId" = u.id
      WHERE r."userId" = $1
      AND r."isPublic" = true;
    `,
      [userId]
    )

    await addCommentsToReviews(reviews)

    return reviews
  } catch (err) {
    throw err
  }
}

const updateReview = async ({ id: reviewId, ...reviewFields }) => {
  try {
    const setString = Object.keys(reviewFields)
      .map((key, idx) => `"${key}"=$${idx + 1}`)
      .join(', ')

    if (setString.length === 0) {
      throw {
        name: `UpdateReviewErro`,
        message: `Must include all fields to update review`,
      }
    }

    const {
      rows: [updatedReview],
    } = await client.query(
      `
        UPDATE reviews
        SET ${setString}
        WHERE id = ${reviewId}
        RETURNING *;
      `,
      Object.values(reviewFields)
    )

    updatedReview.comments = await getCommentsByReview(reviewId)
    return updatedReview
  } catch (err) {
    throw err
  }
}

const addCommentsToReviews = async (reviewArr) => {
  for (let i = 0; i < reviewArr.length; i++) {
    const currReview = reviewArr[i]
    currReview.comments = await getCommentsByReview(currReview.id)
  }
}

module.exports = {
  createReview,
  getPublicReviewsByProduct,
  getReviewsByProduct,
  getReviewById,
  getReviewsByUser,
  getPublicReviewsByUser,
  updateReview,
}

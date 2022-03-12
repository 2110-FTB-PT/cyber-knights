const client = require('../client')

async function createComment({ comment, reviewId, userId, isPublic }) {
  try {
    const {
      rows: [createdComment],
    } = await client.query(
      `
        INSERT INTO comments(comment, "userId", "reviewId", "isPublic") 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [comment, userId, reviewId, isPublic]
    )

    return createdComment
  } catch (error) {
    throw error
  }
}

async function updateReviewComment({ id: commentId, ...commentFields }) {

  const setString = Object.keys(commentFields).map((field, index) => {
    return `"${field}" = $${index + 1}`;
  }).join(", ");

  try {
    const {
      rows: [comment],
    } = await client.query(
      `
            UPDATE comments
            SET ${setString}
            WHERE id= ${commentId}
            RETURNING *;
        `,
      Object.values(commentFields)
    )

    return comment
  } catch (error) {
    throw error
  }
}

async function getPublicCommentsByUser({ username }) {
  try {
    const { rows: comments } = await client.query(
      `
      SELECT comments.*, users.username 
      AS "creatorName" 
      FROM comments
      JOIN users
      ON users.id = comments."userId"
      WHERE users.username=$1
      AND comments."isPublic"=true;
    `,
      [username]
    )

    return comments
  } catch (error) {
    throw error
  }
}

async function getCommentsByReview(reviewId) {
  try {
    const { rows: comments } = await client.query(
      `
      SELECT *
      FROM comments
      WHERE "reviewId"=$1
      AND "isPublic"=true;
  `,
      [reviewId]
    )

    return comments
  } catch (error) {
    throw error
  }
}

module.exports = {
  createComment,
  updateReviewComment,
  getPublicCommentsByUser,
  getCommentsByReview,
}

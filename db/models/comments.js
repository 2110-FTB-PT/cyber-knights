const client = require("../client");

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
    );

    return createdComment;
  } catch (error) {
    throw error;
  }
}

async function updateReviewComment({ id: commentId, ...commentFields }) {
  console.log("commentFields :>> ", commentFields);
  const setString = Object.keys(commentFields)
    .map((field, index) => {
      return `"${field}" = $${index + 1}`;
    })
    .join(", ");

  try {
    if (setString.length === 0) {
      throw {
        name: `UpdateCommentErr`,
        message: `Must include all fields to update comment`,
      };
    }

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
    );

    return comment;
  } catch (error) {
    throw error;
  }
}

async function getPublicCommentsByUser(userId) {
  try {
    const { rows: comments } = await client.query(
      `
      SELECT comments.*, users.username 
      AS "creatorName" 
      FROM comments
      JOIN users
      ON users.id = comments."userId"
      JOIN reviews
      ON reviews.id = comments."reviewId"
      WHERE users.id=$1
      AND comments."isPublic"=true
      AND reviews."isPublic"=true;
    `,
      [userId]
    );

    return comments;
  } catch (error) {
    throw error;
  }
}

async function getCommentsByReview(reviewId) {
  try {
    const { rows: comments } = await client.query(
      `
      SELECT c.*, u.username "creatorName"
      FROM comments c
      JOIN users u ON u.id = c."userId"
      WHERE "reviewId"=$1
      AND "isPublic"=true;
  `,
      [reviewId]
    );

    return comments;
  } catch (error) {
    throw error;
  }
}

async function getCommentbyId(commentId) {
  try {
    const {
      rows: [comments],
    } = await client.query(
      `
        SELECT *
        FROM comments
        WHERE id=$1
        AND "isPublic"=true;
    `,
      [commentId]
    );

    return comments;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createComment,
  updateReviewComment,
  getPublicCommentsByUser,
  getCommentsByReview,
  getCommentbyId,
};

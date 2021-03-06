const express = require("express");
const commentsRouter = express.Router();
const {
  createComment,
  updateReviewComment,
  getCommentbyId,
  getPublicCommentsByUser,
} = require("../db");
const { requireUser } = require("./utils.js");

commentsRouter.get("/myComments", requireUser, async (req, res, next) => {
  const { id } = req.user;
  try {
    const userComments = await getPublicCommentsByUser(id);

    res.send(userComments);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

commentsRouter.post("/create", requireUser, async (req, res, next) => {
  try {
    const { comment, isPublic, reviewId } = req.body;
    const { id: userId } = req.user;
    const newComment = await createComment({
      userId,
      comment,
      isPublic,
      reviewId,
    });

    if (!newComment) {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot post a comment",
      });
    }
    res.send(newComment);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

commentsRouter.patch("/:commentId", requireUser, async (req, res, next) => {
  const { commentId: id } = req.params;
  const { comment, isPublic } = req.body;
  const updateField = { id };

  if (req.body.hasOwnProperty("isPublic")) updateField.isPublic = isPublic;

  if (comment) updateField.comment = comment;

  try {
    const originalComment = await getCommentbyId(id);

    if (originalComment.userId === req.user.id) {
      const updatedComment = await updateReviewComment(updateField);
      res.send(updatedComment);
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a comment that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = commentsRouter;

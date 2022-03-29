const express = require("express");
const reviewsRouter = express.Router();
const {
  createReview,
  updateReview,
  getReviewById,
  getReviewsByProduct,
  getProductById,
  getReviewsByUser,
} = require("../db");
const { requireUser } = require("./utils");

//require user to create a new review
reviewsRouter.post("/create", requireUser, async (req, res, next) => {
  const { isPublic, title, description, productId } = req.body;
  const { id } = req.user;

  if (!title || !description) {
    next({
      name: `CreateReviewErr`,
      message: `Must complete all fields to create a post`,
    });
    return;
  }
  try {
    const newReview = await createReview({
      userId: id,
      isPublic,
      title,
      description,
      productId,
    });

    res.send(newReview);
  } catch (err) {
    next(err);
  }
});

// require user to be logged in and be the original
// creator of the review  to change/update
reviewsRouter.patch("/:reviewId", requireUser, async (req, res, next) => {
  const { reviewId: id } = req.params;
  const { isPublic, title, description } = req.body;
  const updateField = { id };

  if (isPublic) updateField.isPublic = isPublic;

  if (title) updateField.title = title;

  if (description) updateField.description = description;

  try {
    const originalReview = await getReviewById(id);
    if (originalReview.userId === req.user.id) {
      const updatedReview = await updateReview(updateField);
      res.send(updatedReview);
    } else {
      next({
        name: `UnauthorizedUserErr`,
        message: `Can not update review unless you are the owner`,
      });
    }
  } catch (err) {
    next(err);
  }
});

reviewsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    if (!product) {
      next({
        name: `NoProductFound`,
        message: `This product could NOT be found`,
      });
      return;
    }

    const productReviews = await getReviewsByProduct(productId);
    res.send(productReviews);
  } catch (err) {
    next(err);
  }
});

reviewsRouter.get("/myReviews", requireUser, async (req, res, next) => {
  const { id } = req.user;
  try {
    const userReviews = await getReviewsByUser(id);
    if (!userReviews) {
      next({
        name: `NoReviewsError`,
        message: `You haven't made any reviews yet`,
      });
      return;
    }
    res.send(userReviews);
  } catch (err) {
    next(err);
  }
});

module.exports = reviewsRouter;

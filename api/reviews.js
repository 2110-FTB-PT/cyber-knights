const express = require('express')
const reviewsRouter = express.Router()
const { createReview, updateReview, getReviewById } = require('../db')

//require user to create a new review
reviewsRouter.post(
  '/create',
  /* requireUser, */ async (req, res, next) => {
    const { isPublic, title, description, productId } = req.body
    const { id } = req.user

    if (!title || !description) {
      next({
        name: `CreateReviewErr`,
        message: `Must complete all fields to create a post`,
      })
      return
    }
    try {
      const newReview = await createReview({
        userId: id,
        isPublic,
        title,
        description,
        productId,
      })

      res.send(newReview)
    } catch (err) {
      next(err)
    }
  }
)

// also needs a user to be logged in and be the original
// creator of the review  to change/update
reviewsRouter.patch(
  '/:reviewId',
  /* requireUser, */ async (req, res, next) => {
    const { reviewId: id } = req.params
    const { isPublic, title, description } = req.body
    const updateField = { id }

    if (isPublic) updateField.isPublic = isPublic

    if (title) updateField.title = title

    if (description) updateField.description = description

    try {
      const originalReview = await getReviewById(id)
      if (originalReview.userId === 'req.user.id') {
        const updatedReview = await updateReview(updateField)
        res.send(updatedReview)
      } else {
        next({
          name: `UnauthorizedUserErr`,
          message: `Can not update review unless you are the owner`,
        })
      }
    } catch (err) {
      next(err)
    }
  }
)

module.exports = reviewsRouter

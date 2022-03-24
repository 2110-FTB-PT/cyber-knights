const express = require('express')
const imagesRouter = express.Router()
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const dotenv = require('dotenv')
const cloudinaryStorage = require('cloudinary-multer')
const {createProductImage, createReviewImage } =require('../db/models/images')

// const storage = require('cloudinary-multer')

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
});

const upload = multer({
    storage: storage
})






imagesRouter.post('/uploadreview/:reviewId',upload.single('reviews'),async (req, res, next) => {
    const imageData = {}
    const {reviewId} = req.params
  try {
    console.log(req.file);
    console.log(reviewId)
    imageData.description = req.file.fieldname
    imageData.url = req.file.url
    imageData.reviewId = reviewId
    const ImageUpload = await createReviewImage(imageData)
    res.send(ImageUpload)
  } catch (error) {
    next(error)
  }
})




  
  imagesRouter.post('/uploadproducts/:productId',upload.single('products'),async (req, res, next) => {
      const imageData = {}
      const {productId} = req.params
    try {
      console.log(req.file);
      imageData.description = req.file.fieldname
      imageData.url = req.file.url
      imageData.productId = productId
      const ImageUpload = await createProductImage(imageData)
      res.send(ImageUpload)
    } catch (error) {
      next(error)
    }
  })
  
  




module.exports = imagesRouter;
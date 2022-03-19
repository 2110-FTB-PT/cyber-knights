const express = require('express')
const imagesRouter = express.Router()
const multer = require('multer')
const {createProductImage, createReviewImage } =require('../db/models/images')





const fileStorageEngineReviews = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './public/review')
  },
  filename: (req, file, cb) =>{
    cb(null,Date.now() + '--' + file.originalname)
  }
})

const uploadReviews = multer({storage: fileStorageEngineReviews})

imagesRouter.post('/uploadreview-:reviewId',uploadReviews.single('reviews'),async (req, res, next) => {
    const imageData = {}
    const {reviwId} =req.params
  try {
    console.log(req.file);
    imageData.description = req.file.fieldname
    imageData.url = req.file.path
    imageData.reviewId = reviwId
    await createReviewImage(imageData)
    res.send({ message: 'File Upload Success' })
  } catch (error) {
    next(error)
  }
})



const fileStorageEngineProducts = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, './public/product')
    },
    filename: (req, file, cb) =>{
      cb(null,Date.now().toString() + '--' + file.originalname)
    }
  })
  
  const uploadProducts = multer({storage: fileStorageEngineProducts})
  
  imagesRouter.post('/uploadproducts-:productId',uploadProducts.single('products'),async (req, res, next) => {
      const imageData = {}
      const {productId} = req.params
    try {
      console.log(req.file);
      imageData.description = req.file.fieldname
      imageData.url = req.file.path
      imageData.productId = productId
      await createProductImage(imageData)
      res.send({ message: 'File Upload Success' })
    } catch (error) {
      next(error)
    }
  })
  
  




module.exports = imagesRouter;
const express = require('express')
const cartRouter = express.Router();
const { createCart,deleteCart, purchaseCart} = require("../db");


cartRouter.post("/create", async (req, res, next)=>{
    const {userId, productId} = req.body
    try{
        const newCart = await createCart({userId, productId})
        res.send(newCart)
    }catch (error) {
        next(error)
      }
})


cartRouter.delete("/delete", async (req, res, next) => {

    const {cartId} = req.body

    try{

        const deletedCart = await deleteCart(cartId)
        res.send(deletedCart)

    }catch (error) {
        next(error)
      }


})

cartRouter.post("/checkout",  async(req, res, next)=>{
    const {isPurchase, userId} = req.body
    try{
        const checkout  = await purchaseCart({isPurchase, userId})
        res.send(checkout)
    }catch (error) {
        next(error)
      }
})

module.exports = cartRouter;

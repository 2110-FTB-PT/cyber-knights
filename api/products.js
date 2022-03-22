const express = require("express");

const productsRouter = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  getAllPublicProducts,
  updateProduct,
} = require("../db");

const { requireAdmin } = require("./utils");

productsRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/public", async (req, res, next) => {
  try {
    const publicProducts = await getAllPublicProducts();
    res.send(publicProducts);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const singleProduct = await getProductById(productId);
    res.send(singleProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const { name, description, price, isPublic } = req.body;
    if (!name || !description) {
      next({
        name: "incompletebodyerror",
        message: "Requires a username and description",
      });
      return;
    }
    const newProduct = await createProduct({
      name,
      description,
      price,
      isPublic,
    });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:productId", requireAdmin, async (req, res, next) => {
  try {
    const { productId: id } = req.params;
    const { name, description, price, isPublic } = req.body;
    const updateFields = { id, name, price, description, isPublic };
    const updatedProduct = await updateProduct(updateFields);
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;

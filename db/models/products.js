const client = require("../client");
const { getProductImageByID } = require("./images");
const addImagestoProducts = async (products) => {
  try {
    for (let i = 0; i < products.length; i++) {
      currProduct = products[i];
      currProduct.images = await getProductImageByID(currProduct.id);
    }
  } catch (error) {
    throw error;
  }
};
const createProduct = async ({ name, description, price, isPublic }) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    INSERT INTO products(name,description,price,"isPublic")
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (name) DO NOTHING
    RETURNING *
    `,
      [name, description, price, isPublic]
    );
    if (!product)
      throw {
        name: "CreateDupProduct",
        message: `Product already exists with this name: ${name}`,
      };
      product.images= await getProductImageByID(product.id)
    return product;
  } catch (err) {
    throw err;
  }
};

const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(`
    SELECT * FROM products
    `);
    await addImagestoProducts(products)
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const {
      rows: [productById],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE id=$1
    `,
      [productId]
    );
    productById.images = await getProductImageByID(productById.id)
    return productById;
  } catch (err) {
    throw err;
  }
};

const getAllPublicProducts = async () => {
  try {
    const { rows: products } = await client.query(`
    SELECT *
    FROM products 
    WHERE "isPublic" = true;
    `);
   await addImagestoProducts(products)
    return products;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async ({ id, name, description, price, isPublic }) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    UPDATE products
    SET name = $1, description = $2, price=$3, "isPublic"=$4
    WHERE id=$5
    RETURNING *;
    `,
      [name, description, price, isPublic, id]
    );
    if (!product)
      throw {
        name: `UpdateActivityError`,
        message: `Can NOT update activity that does NOT exist`,
      };
    product.images=await getProductImageByID(product.id)
    return product;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getAllPublicProducts,
  updateProduct,
};

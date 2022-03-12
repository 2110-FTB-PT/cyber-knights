const client = require("../client");

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
      [ name, description, price, isPublic]
    );
    if (!product)
      throw {
        name: "CreateDupProduct",
        message: `Product already exists with this name: ${name}`,
      };
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
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getAllPublicProducts
};

const client = require("../client")


const createCart = async({userId, productId})=>{

    console.log("This is user id", userId, "this is productId", productId)

    try{
        const {rows: [cart]} = await client.query(`
        INSERT INTO cart("userId", "productId")
        VALUES ($1, $2)
        RETURNING *;
        `, [userId, productId]);
        return cart;
    }catch(error){
        throw error;
    }
}

const getCartByUser = async(userId)=>{

    try{
        const {rows: cart} = await client.query(`
        SELECT products.*, pi.url, cart.id AS "cartId" FROM products 
        JOIN cart ON cart."productId" = products.id
        JOIN users ON users.id = cart."userId"
        JOIN product_images pi ON pi."productId" = products.id
        WHERE cart."userId" = $1 AND cart."isPurchase"= false;
        `, [userId]);

        return cart ;
    }catch(error){
        throw error;
    }
}





const purchaseCart = async ({isPurchase, userId}) => {
   
  
    try {
      const { rows: updatedCart } = await client.query(`
        UPDATE cart
        SET "isPurchase" = $1
        WHERE "userId" = $2 
        RETURNING *;
      `, [isPurchase, userId])
  
      return updatedCart;
    } catch (err) {
      throw err;
    }
  }

  const deleteCart = async (cartId) =>{

    try{

        const {rows: [deleteCartItem]} = await client.query(`
        DELETE FROM cart
        WHERE id = $1
        RETURNING *;

        `, [cartId]) 

        return deleteCartItem

    }catch (err) {
        throw err;
      }
  }


module.exports ={   
    createCart,
    getCartByUser,
    purchaseCart,
    deleteCart
    
}
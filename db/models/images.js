const client = require('../client');




const getAllProductImages = async()=>{

    try{
        const {rows: images} = await client.query(`
        SELECT * FROM product_images
        `);
        return images;
    }catch(error){
        throw error;
    }
}

const createProductImage = async({description, url, productId})=>{

    try{
        const {rows: [newImage]} = await client.query(`
        INSERT INTO product_images("description", "url", "productId")
        VALUES ($1, $2, $3)
        RETURNING *;
        `,[description, url, productId])

        return newImage

    }catch(error){
        throw error;
   }
}



const getProductImageByID = async(productId) =>{
    try{
        const {rows }= await client.query(`
            SELECT *
            FROM product_images
            WHERE "productId" = $1
        `, [productId])
        return rows
    }catch(error){
        throw error;
    }
}



const getAllReviewImages = async()=>{

    try{
        const {rows: images} = await client.query(`
        SELECT * FROM review_images
        `);
        return images;
    }catch(error){
        throw error;
    }
}

const createReviewImage = async({description, url, reviewId})=>{

    try{
        const {rows: [newImage]} = await client.query(`
        INSERT INTO review_images("description", "url", "reviewId")
        VALUES ($1, $2, $3)
        RETURNING *;
        `,[description, url, reviewId])

        return newImage

    }catch(error){
        throw error;
   }
}


const getReviewImageByID = async(reviewId) =>{
    try{
        const {rows }= await client.query(`
            SELECT *
            FROM review_images
            WHERE "reviewId" = $1
        `,[reviewId])
        return rows
    }catch(error){
        throw error;
    }
}



module.exports ={

    getAllProductImages,
    createProductImage,
    getProductImageByID,
    getAllReviewImages,
    createReviewImage,
    getReviewImageByID


}
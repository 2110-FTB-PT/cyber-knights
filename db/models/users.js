const client = require("../client");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function createUser ({ username, password }) {
    const hashPwd = await bcrypt.hash(password, SALT_ROUNDS);
    try {
        const {
          rows: [user],
        } = await client.query(
          `
            INSERT INTO users(username, password) 
            VALUES($1, $2) 
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
          `,
          [username, hashPwd]
        );
        delete user.password;
        return user;
      } catch (error) {
        throw error;
      }
}

async function getUser({ username, password }) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
            SELECT *
            FROM users
            WHERE username=$1;
          `,
        [username]
      );
  
      if (!user) {
        throw {
          name: "UserDoesNotExist",
          message: "User does not exist",
        };
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        delete user.password;
        return user;
      } else {
        throw {
          name: "IncorrectPassword",
          message: "Password provided was incorrect, Please try again",
        };
      }
    } catch (error) {
      throw error;
    }
  }

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      ` 
          SELECT id, username
          FROM users
          WHERE id=$1;
        `,
      [id]
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT *
          FROM users
          WHERE username=$1;
        `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}  

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
  };
const express = require("express");
const usersRouter = express.Router();
const { getUser, getUserByUsername } = require("../db/users.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/me", (req, res, next) => {
   if (req.user) {
     res.send(req.user);
   } else {
     next({
       name: "InvalidToken",
       message: "Invalid token error",
     });
   }
 });

 usersRouter.get("/:username/reviews", async (req, res, next) => {
   const { username } = req.params;

   try {
     const reviews = await getPublicReviewsByUser({ username });

     res.send(reviews);
   } catch ({ name, message }) {
     next({ name, message });
   }
 });

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });

    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "You're logged in!", token: token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
      return;
    }

    if (password.length < 8) {
      next({
        name: "PasswordLengthError",
        message: "Password needs to be at least 8 characters",
      });
      return;
    }

    const user = await createUser({
      username,
      password,
    });

    res.send({
      message: "Thank you for signing up!",
      user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;

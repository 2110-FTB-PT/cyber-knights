const apiRouter = require("express").Router();
const usersRouter = require("./users");
const commentsRouter = require("./comments");
const { getUserById } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  })
})

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.header('Authorization')

  if (!auth) {
    next()
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length)

    try {
      const { id } = jwt.verify(token, JWT_SECRET)

      if (id) {
        req.user = await getUserById(id)
        next()
      }
    } catch ({ name, message }) {
      next({ name, message })
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    })
  }
})

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user)
  }
  next()
})

// place your routers here
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use('/reviews', require('./reviews'))
apiRouter.use('/images', require('./images'))

module.exports = apiRouter

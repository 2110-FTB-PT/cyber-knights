const client = require('./client')

module.exports = {
  client,
  ...require('./models/users'),
  ...require('./models/products'),
  ...require('./models/images'),
  ...require('./models/reviews'),
  ...require('./models/comments'),
}

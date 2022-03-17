const requireUser = async (req, res, next) => {
  if (!req.user) {
    next({
      name: `LogInRequired`,
      message: `You must be logged in to do that`,
    })
  } else {
    next()
  }
}

const requireAdmin = async (req, res, next) => {
  if (!req.user.admin) {
    next({
      name: `AdminONly`,
      message: `You must be an admin to do that`,
    })
  } else {
    next()
  }
}

module.exports = {
  requireUser,
  requireAdmin,
}

const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.url, req.method)
  next()
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    const user = await Users.getById(id)
    if(!user) {
      res.status(404).json({
        message: 'No such user'
      })
    } else {
      req.user = user
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'problem finding user'
    })
  }
};


function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = req.body
    if(!user.name) {
      res.status(400).json({
        message: 'missing require name field'
      })
    } else {
        next();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { text } = req.body
    if(!text) {
      res.status(400).json({
        message: 'missing required text field'
      })
    } else {
        next();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUserId,
  validateUser
}
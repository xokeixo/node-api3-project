const express = require('express');
const User = require('../users/users-model');
const Post = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware.js')

const router = express.Router();

router.get('/', (req, res) => {
  User.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  User.getById(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.name)
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const changes = req.body;
  User.update(req.params.id, changes)
  .then(user => {
    if(user){
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'The user could not be found' })
    }
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await User.remove(req.params.id)
    res.json(req.user)
  } catch(err){
    next(err)
  }
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const result = await Post.insert({
      ...req.body,
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  } catch(err) {
    next(err)
  }
});

// do not forget to export the router
module.exports = router;
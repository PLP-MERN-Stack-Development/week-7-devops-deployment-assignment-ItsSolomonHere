const Joi = require("joi")

const validatePost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    excerpt: Joi.string().max(200),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean(),
    featuredImage: Joi.string(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    })
  }
  next()
}

const validateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(200),
    color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    })
  }
  next()
}

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    bio: Joi.string().max(500),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    })
  }
  next()
}

module.exports = { validatePost, validateCategory, validateUser }

const Post = require("../models/Post")
const Category = require("../models/Category")

// Get all posts
const getPosts = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const category = req.query.category
    const search = req.query.search

    const query = { isPublished: true }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    const posts = await Post.find(query)
      .populate("author", "username firstName lastName avatar")
      .populate("category", "name slug color")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Post.countDocuments(query)

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Get single post
const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    })
      .populate("author", "username firstName lastName avatar bio")
      .populate("category", "name slug color")
      .populate("comments.user", "username firstName lastName avatar")

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      })
    }

    // Increment view count
    await post.incrementViewCount()

    res.json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Create post
const createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id,
    }

    const post = await Post.create(postData)

    // Update category post count
    await Category.findByIdAndUpdate(post.category, { $inc: { postCount: 1 } })

    const populatedPost = await Post.findById(post._id)
      .populate("author", "username firstName lastName avatar")
      .populate("category", "name slug color")

    res.status(201).json({
      success: true,
      data: populatedPost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Update post
const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      })
    }

    // Check if user owns the post or is admin
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this post",
      })
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("author", "username firstName lastName avatar")
      .populate("category", "name slug color")

    res.json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      })
    }

    // Check if user owns the post or is admin
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to delete this post",
      })
    }

    // Update category post count
    await Category.findByIdAndUpdate(post.category, { $inc: { postCount: -1 } })

    await Post.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: "Post deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Add comment to post
const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      })
    }

    await post.addComment(req.user.id, req.body.content)

    const updatedPost = await Post.findById(req.params.id).populate(
      "comments.user",
      "username firstName lastName avatar",
    )

    res.json({
      success: true,
      data: updatedPost.comments,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
}

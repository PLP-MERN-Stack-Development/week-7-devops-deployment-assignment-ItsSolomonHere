const express = require("express")
const { getPosts, getPost, createPost, updatePost, deletePost, addComment } = require("../controllers/postController")
const { auth } = require("../middleware/auth")
const { validatePost } = require("../middleware/validation")

// 🔍 Add debug logs RIGHT AFTER imports
console.log("validatePost is", typeof validatePost)
console.log("createPost is", typeof createPost)


const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", auth, validatePost, createPost)
router.put("/:id", auth, validatePost, updatePost)
router.delete("/:id", auth, deletePost)
router.post("/:id/comments", auth, addComment)

module.exports = router

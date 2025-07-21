const express = require("express")
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController")
const { auth, adminAuth } = require("../middleware/auth")
const { validateCategory } = require("../middleware/validation")

const router = express.Router()

router.get("/", getCategories)
router.get("/:id", getCategory)
router.post("/", auth, adminAuth, validateCategory, createCategory)
router.put("/:id", auth, adminAuth, validateCategory, updateCategory)
router.delete("/:id", auth, adminAuth, deleteCategory)

module.exports = router

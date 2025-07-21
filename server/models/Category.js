const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

// Create slug from name before saving
CategorySchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next()
  }

  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")

  next()
})

module.exports = mongoose.model("Category", CategorySchema)

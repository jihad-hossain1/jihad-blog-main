import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
    unique: [true, "Name must be unique"],
  },

  createdAt: { type: Date, default: Date.now },
  sortId: {
    type: String,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
    unique: [true, "Name must be unique"],
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  createdAt: { type: Date, default: Date.now },
  sortId: {
    type: String,
  },
});

const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);

export { Category, SubCategory };

// Using Node.js `require()`
const mongoose = require("mongoose");

const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
);
// Add plugin to Course
mongoose.plugin(slug);

// override all methods
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", Course);

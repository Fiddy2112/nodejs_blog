// Using Node.js `require()`
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  { _id: false, timestamps: true }
);
// Add plugin to CourseSchema
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);

// override all methods
CourseSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("CourseS", CourseSchema);

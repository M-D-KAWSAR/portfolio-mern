const mongoose = require('mongoose');

const CATEGORIES = ['Web Development', 'AI / Machine Learning', 'Data Science'];

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    techStack: [{ type: String }],
    category: { type: String, enum: CATEGORIES, required: true },
    githubLink: { type: String },
    liveLink: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Project', projectSchema);

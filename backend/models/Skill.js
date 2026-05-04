const mongoose = require('mongoose');

const CATEGORIES = ['Web Development', 'AI / Machine Learning', 'Data Science', 'Tools'];

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    icon: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);

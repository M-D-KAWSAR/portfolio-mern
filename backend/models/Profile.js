const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    titles: [{ type: String }],
    bio: { type: String },
    shortBio: { type: String },
    profileImage: { type: String },
    email: { type: String },
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    resumeLink: { type: String },
    location: { type: String },
    yearsOfExperience: { type: String },
    openToWork: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);

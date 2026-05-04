const mongoose = require('mongoose');

const cvConfigSchema = new mongoose.Schema(
  {
    templateId: { type: String, default: 'classic' },
    cvData: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CVConfig', cvConfigSchema);

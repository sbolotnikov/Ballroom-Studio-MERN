const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KickSchema = new Schema({
  message: {
    type: String,
    maxlength: 280
  },
  topic: {
    type: String,
    required: true
  }
});

KickSchema.set('timestamps', true);

const Kick = mongoose.model("Kick", KickSchema);

module.exports = Kick;
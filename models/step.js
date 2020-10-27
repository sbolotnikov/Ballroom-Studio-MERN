const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepsSchema = new Schema({
  message: {
    type: String,
    maxlength: 280
  },
  topic: {
    type: String,
  },
  dm_recipient: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});

StepsSchema.set('timestamps', true);

const Steps = mongoose.model("Steps", StepsSchema);

module.exports = Steps;
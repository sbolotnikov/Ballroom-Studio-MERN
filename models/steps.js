const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepsSchema = new Schema({
  message: {
    type: String
  },
  topic: {
    type: String,
  },
  dm_recipient: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

StepsSchema.set('timestamps', true);

const Steps = mongoose.model("Steps", StepsSchema);

module.exports = Steps;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  topic: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});

TopicSchema.set('timestamps', true);

const Topics = mongoose.model("Topics", TopicSchema);

module.exports = Topics;
// Require schema and model from mongoose
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
    reactionBody: { type: String, required: true, maxLenght: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date, default: Date.now, get: (date) => {
        return new Date(date).toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric" });
      }
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Construct a new instance of the schema class
const thoughtSchema = new mongoose.Schema(
  {
    // Configure individual properties using Schema Types
    thoughtText: { type: String, required: true, minLength: 1, maxLenght: 280 },
    createdAt: {
      type: Date, default: Date.now, get: (date) => {
        return new Date(date).toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric" });
      }
    },
    // username: { type: String, required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// reactionSchema.virtual('change').get(function () {
//   var temp = this.toObject();

//   //Rename fields
//   temp.reactionId = temp._id;
//   delete temp._id;

//   return temp;
// });

// Using mongoose.model() to compile a model based on the schema 'friendSchema'
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;

// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema(
  {
    // Configure individual properties using Schema Types
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Using mongoose.model() to compile a model based on the schema 'friendSchema'
const User = mongoose.model('User', userSchema);

module.exports = User;

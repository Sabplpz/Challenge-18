const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    // Get all students
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single student
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new student
    async createThought(req, res) {
        // {
        //     "thoughtText": "Here's a cool thought...",
        //     "username": "lernantino"
        //   }
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
            if (!user) {
              return res.status(404).json({
                message: 'Application created, but found no user with that ID',
              })
            }
            res.json(thought);
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    },
    async updateThought(req, res) {
        // {
        //     "thoughtText": "Here's a cool thought...",
        //     "username": "lernantino"
        //   }
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body)
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({ message: 'Thought successfully updated' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a student and remove them from the course
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId)
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add an assignment to a student
    async addReaction(req, res) {
        // {
        //     "reactionBody": "Wow.",
        //     "username": "lernantino"
        //   }
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove assignment from a student
    async deleteReaction(req, res) {
        // {
        //     "reactionBody": "Wow.",
        //     "username": "lernantino"
        //   }
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    // Get all students
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('-__v');

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single student
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new student
    async createUser(req, res) {
        // {
        //     "username": "lernantino",
        //     "email": "lernantino@gmail.com"
        //  }
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        // {
        //     "username": "lernantino",
        //     "email": "lernantino@gmail.com"
        //  }
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body)
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({ message: 'User successfully updated' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a student and remove them from the course
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId)
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add an assignment to a student
    async addFriend(req, res) {
        console.log('You are adding an friend');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove assignment from a student
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
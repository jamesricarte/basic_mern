const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Create
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
})

//Read All
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Read One
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

//Update
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user) return res.status(404).json({ message: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found'});
        res.json({ message: 'User Deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

module.exports = router;
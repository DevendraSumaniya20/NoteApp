const router = require('express').Router();
const Note = require('../models/Notes');
const User = require('../models/User');

// Create Note
router.post('/addNote', async (req, res) => {
  try {
    const {title, description, postedBy, startDate, endDate} = req.body;

    // Validate required fields
    if (!title || !description || !postedBy || !startDate || !endDate) {
      return res.status(400).json({message: 'All fields are required.'});
    }

    const note = new Note({
      title,
      description,
      postedBy,
      startDate,
      endDate,
    });

    const data = await note.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Delete Note
router.delete('/deleteNote/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({message: 'Note not found', status: false});
    }

    await Note.deleteOne({_id: req.params.id});
    res.status(200).json({message: 'Note Deleted Successfully', status: true});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Update Note
router.put('/updateNote/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({message: 'Note not found', status: false});
    }

    // Update fields only if they are provided in the request body
    const updatedData = {
      title: req.body.title || note.title,
      description: req.body.description || note.description,
      postedBy: req.body.postedBy || note.postedBy,
      startDate: req.body.startDate || note.startDate,
      endDate: req.body.endDate || note.endDate,
    };

    await Note.updateOne({_id: req.params.id}, updatedData);
    res.status(200).json({message: 'Note updated Successfully', status: true});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get all notes by userId
router.get('/getNotes/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(404).json({message: 'User not found'});
    }

    const notes = await Note.find({postedBy: req.params.userId});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

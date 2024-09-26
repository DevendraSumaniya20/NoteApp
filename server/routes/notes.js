const router = require('express').Router();
const Note = require('../models/Notes');
const User = require('../models/User');

router.post('/addNote', async (req, res) => {
  try {
    const {title, description, startDate, endDate, status, userId} = req.body;

    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      !status ||
      !userId
    ) {
      return res.status(400).json({message: 'All fields are required.'});
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({message: 'End date must be after start date.'});
    }

    const note = new Note({
      title,
      description,
      startDate,
      endDate,
      status,
      userId,
    });

    const data = await note.save();
    res.status(201).json({message: 'Note created successfully', note: data});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

router.delete('/deleteNote/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({message: 'Note not found'});
    }

    await Note.deleteOne({_id: req.params.id});
    res.status(200).json({message: 'Note deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

router.put('/updateNote/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({message: 'Note not found'});
    }

    const updatedData = {
      title: req.body.title || note.title,
      description: req.body.description || note.description,
      startDate: req.body.startDate || note.startDate,
      endDate: req.body.endDate || note.endDate,
      status: req.body.status || note.status,
      userId: note.userId,
    };

    if (new Date(updatedData.startDate) >= new Date(updatedData.endDate)) {
      return res
        .status(400)
        .json({message: 'End date must be after start date.'});
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {new: true},
    );
    res
      .status(200)
      .json({message: 'Note updated successfully', note: updatedNote});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

router.get('/getNotes/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(404).json({message: 'User not found'});
    }

    const notes = await Note.find({userId: req.params.userId});
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

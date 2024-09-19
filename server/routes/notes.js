const router = require('express').Router();
const Note = require('../models/Notes');
const User = require('../models/User');

//create Note

router.post('/addNote', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });

    const data = await note.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete Note

router.delete('/deleteNote/:id', async (req, res) => {
  try {
    const notes = await Note.findOne({_id: req.params.id});
    !notes && res.status(401).json({message: 'Note not found', status: false});
    const note = await Note.deleteOne({_id: req.params.id});
    res.status(200).json({message: 'Note Deleted Successfully', status: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update notes

router.put('/updateNote/:id', async (req, res) => {
  try {
    const notes = await Note.findOne({_id: req.params.id});
    !notes && res.status(401).json({message: 'Note not found', status: false});
    const note = await Note.updateOne({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });
    res.status(200).json({message: 'Note updated Successfully', status: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all notes by userId
router.get('/getNotes/:userId', async (req, res) => {
  try {
    // Fetch the user by the provided userId parameter
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(400).json({data: 'User not found'});
    }

    // Fetch notes posted by the userId
    const notes = await Note.find({postedBy: req.params.userId});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

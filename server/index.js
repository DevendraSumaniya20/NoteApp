const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err.message);
  });

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

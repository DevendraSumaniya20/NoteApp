const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose
  .connect(mongodb)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log('server is running on port 3000');
});

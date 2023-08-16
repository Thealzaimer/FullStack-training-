const express = require('express');
const mongoose = require('mongoose')

const stuffRoutes = require('./routes/stuff');

mongoose.connect('mongodb+srv://MehdiC:MDXlpCno7ZGLMkHS@backend.drea6n1.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('sucess !'))
  .catch(() => console.log('Fail !'));



const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/stuff',stuffRoutes);

module.exports = app;
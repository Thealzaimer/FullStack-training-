const express = require('express');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff',(req,res,next) =>{
  console.log(req.body);
  res.status(201).json({
    message: 'Object created !'
  });
  next()
});


app.get('/api/stuff', (req, res, next) =>
 {
    var stuff1 = [
      {
        _id: 'O3',
        title: 'My first object',
        description: 'About my first object',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'Admin',
      }
      
    ]  
    var stuff = [
      {
        _id: 'O1',
        title: 'My first object',
        description: 'About my first object',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'Admin',
      },
      {
        _id: 'O2',
        title: 'My second object',
        description: 'About my second object',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'Admin1',
      }
    ];

    stuff= stuff.concat(stuff1)
    res.status(200).json(stuff);
  });

module.exports = app;
const express = require('express');

const app = express();

app.use((req,res,next) =>{
    console.log('request received !');
    next();
});

app.use((req,res,next) =>{
    res.status(202);
    next();
});

app.use((req, res,next) => {
    res.json({ message: 'Your request has been received !'});
    next();
});
app.use((req,res) =>{
    console.log({ message:'The Response has been received succesfully !' })
});

module.exports = app;
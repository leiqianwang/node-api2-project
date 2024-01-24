// implement your server here
// require your posts router and connect it here

const express = require('express');
const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    });
});

// const express = require('express');
// //const server = express()
// //server.use(express.json())
// const postsRouter = require('./posts/posts-router');

// const router = express.Router();

// //the file will be used when the route begins with '/api'
// router.use('/posts', postsRouter);


// //server.use('*', (req, res) => {
// //res.status(404).json({
//   //message:  'not found'
// //})

module.exports = server;
// require your server and launch it here
// const express = require('express');

// const postRoute = require('./posts/posts-router');

const server = require('./api/server');

const port = 9000

// server.use('/posts', postRoute);

// server.use('/', (req, res) => res.send("API up and runing!"));

server.listen(port, () => {
    console.log('API runing on port 9000', port)
});
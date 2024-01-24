// implement your posts router here
const express = require('express');
const Posts = require('./posts-model'); // make sure to create and export this file


const router = express.Router();


router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: "The posts information could not be retrieved", err: err.message });
        });
});
//     try{
//         res.status(200).send('The post information from the endpoint fetched')

//     }catch(err) {
//        res.status(500).json({
//         message: 'The posts information could not be retrieved',
//         err: err.message,
//        })
//     }


router.get('/:id', async (req, res) => {
    try{
        const selectId = await Posts.findById(req.params.id)
         // const {id} = req.params;
          if(!selectId) {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
          }else {
            res.status(200).send('Hello from the GET /:id endpoint')
          }
    }catch(err) {
       res.status(500).json({
       message: "The post information could not be retrieved",
       err: err.message,
       })
    }
});

router.post('/', (req, res) => {

});


router.put('/:id', (req, res) => {

});

router.delete('/', (req, res) => {

});




module.exports = router;
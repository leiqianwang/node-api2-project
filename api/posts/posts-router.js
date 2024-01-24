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
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            err: err.message,
        });
    }
});

router.post('/', (req, res) => {
    const {title, contents} = req.body;

    if (!title || !contents) {
        res.status(400).json({
            message:  "Please provide title and contents for the post",
        });
    } else {
        Posts.insert({title, contents})
            .then(({ id }) => {
                // get the full post from the database using the returned id
                return Posts.findById(id);
            })
            .then(post => {
                // respond with the full post
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                    err: err.message,
                });
            });
    }
});


router.put('/:id', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        });
    } else {
        Posts.update(req.params.id, { title, contents })
            .then(count => {
                if (count > 0) {
                    // get the full post from the database using the id
                    return Posts.findById(req.params.id);
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist" });
                }
            })
            .then(post => {
                // respond with the full post
                res.status(200).json(post);
            })
            .catch(err => {
                res.status(500).json({
                    message: "The post information could not be modified",
                    err: err.message,
                });
            });
    }
});

router.delete('/:id', (req, res) => {

    let postToDelete;

    // first find the post
    Posts.findById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                postToDelete = post; // store the post
                // then delete it
                return Posts.remove(req.params.id);
            }
        })
        .then(count => {
            if (count > 0) {
                res.status(200).json(postToDelete); // respond with the deleted post
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post could not be removed", err: err.message });
        });
});


router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The comments information could not be retrieved", err: err.message });
        });
});
   


module.exports = router;
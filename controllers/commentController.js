let db = require('./../models');
let authService = require('./../services/authservise');
let access = {};
let authController = require('./authController');
const commentController = {};

let passport = require('passport');


commentController.post = (req, res) => {
    if (req.isAuthenticated()) {
        // Validate request
        if (!req.body.text) {
            return res.status(400).send({
                message: "comment content can not be empty"
            });
        };
        // Create a comment
        const comment = new db.Comment({
            text: req.body.text,
            _creator: req.body._creator,
            _poolEvent: req.body._poolEvent
        });
        // Save comment in the database
        comment.save()
            .then(newComment => {
                db
                    .PoolEvent
                    .findByIdAndUpdate(req.body._poolEvent, 
                        { $push: { '_comments': newComment } })
                    .populate({ path: '_comments' })
                    .then((existingPoolEvent) => {
                        res
                            .status(200)
                            .json({
                                success: true,
                                data: existingPoolEvent
                            })
                    })
                    .catch();

            }).catch(err => {
                res
                    .status(500)
                    .send({
                        message: err.message || "Some error occurred while creating the Comment."
                    });
            });
    } else {
        res.status(500)
            .json({message : 'user not authenticated'});
    }
};

// Retrieve and return all comment from the database.
commentController.findAll = (req, res) => {
    db.Comment.find()
        .then(comments => {
            res.send(comments);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comment."
            });
        });
}

// Find a single comment with a commentId
commentController.findOne = (req, res) => {
    db.Comment.findById(req.params.id)
        .then(comment => {
            if (!comment) {
                return res.status(404).send({
                    message: "comment not found with id " + req.params.commentId
                });
            }
            res.send(comment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "comment not found with id " + req.params.commentId
                });
            }
            return res.status(500).send({
                message: "Error retrieving comment with id " + req.params.commentId
            });
        });
};

// Update a comment identified by the commentId in the request
commentController.update = (req, res) => {
    if (!req.body.text) {
        return res.status(400).send({
            message: "comment content can not be empty"
        });
    }

    // Find comment and update it with the request body
    db.Comment.findByIdAndUpdate(req.params.id, {
        text: req.body.text || "Untitled comment"
    }, { new: true })
        .then(comment => {
            if (!comment) {
                return res.status(404).send({
                    message: "comment not found with id " + req.params.id
                });
            }
            res.send(comment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "comment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating comment with id " + req.params.id
            });
        });
};

// Delete a comment with the specified commentId in the request
commentController.delete = (req, res) => {
    db.Comment.findByIdAndRemove(req.params.id)
        .then(comment => {
            if (!comment) {
                return res.status(404).send({
                    message: "comment not found with id " + req.params.id
                });
            }
            res.send({ message: "comment deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "comment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete comment with id " + req.params.id
            });
        });
};


commentController.getCommentsByPoolEventId = (req, res) => {
    db.Comment.find({ _poolEvent: req.params.poolEvent }).populate({path : '_votes'})
    .sort( { 'createdAt': -1 } )
        .then((comments) => {
            //if (global.profile) {
            if (req.isAuthenticated()) {
                res.status(200)
                    .json({
                        success: true,
                        data: {
                            comments
                        }
                    })
            } else {
                res
                    .status(500)
                    .json({
                        message: 'user is not authenticated'
                    })
            }
        })
        .catch((err) => {
            res
                .status(500)
                .json({
                    message: err.message
                });
        });
}

commentController.currentSession = (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        profile: req.session.passport.user
    });
}




module.exports = commentController;
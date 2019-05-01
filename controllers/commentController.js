let db = require('./../models');

const commentController = {};

commentController.post = (req, res) => {
    // Validate request
    if (!req.body.text) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    };
    // Create a Note
    const comment = new db.Comment({
        text: req.body.text,
        _creator: req.body._creator,
        _poolEvent: req.body._poolEvent
    });

    // Save Note in the database
    comment.save()
        .then(newComment => {
            console.log(newComment);
            db
                .PoolEvent
                .findByIdAndUpdate(req.body._poolEvent, { $push: { '_comments': newComment } })
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
};

// Retrieve and return all notes from the database.
commentController.findAll = (req, res) => {
    db.Comment.find()
        .then(comments => {
            res.send(comments);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

// Find a single note with a noteId
commentController.findOne = (req, res) => {
    db.Comment.findById(req.params.id)
        .then(comment => {
            if (!comment) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(comment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

// Update a note identified by the noteId in the request
commentController.update = (req, res) => {
    if (!req.body.text) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    db.Comment.findByIdAndUpdate(req.params.id, {
        text: req.body.text || "Untitled Note"
    }, { new: true })
        .then(comment => {
            if (!comment) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(comment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
commentController.delete = (req, res) => {
    db.Comment.findByIdAndRemove(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });
};

module.exports = commentController
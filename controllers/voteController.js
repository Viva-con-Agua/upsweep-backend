const db = require('./../models');
const voteController = {};

voteController.post = (req, res) => {
    let vote = new db.Vote({
        _creator: req.body.userId,
        _comment: req.body.commentId
    });
    vote
        .save()
        .then((newVote) => {
            db
                .Comment
                .findByIdAndUpdate(req.body.commentId, { $push: { _votes: newVote } })
                .populate({ path: '_votes' })
                .then((existingComment) => {
                    res
                        .status(200)
                        .json({
                            success: true,
                            data: existingComment,
                            vote
                        });
                })
                .catch((err) => {
                    res
                        .status(500)
                        .json({ message: err.message });
                })
        })
        .catch((err) => {
            res
                .status(500)
                .json({
                    message: err.message
                });
        });
}

module.exports = voteController;
const db = require('./../models');
const replyController = {};

replyController.post = (req, res) => {
    let reply = new db.Reply({
        text: req.body.text,
        _creator: req.body.userId,
        _comment: req.body.commentId
    });
    reply
        .save()
        .then((newReply) => {
            db
                .Comment
                .findByIdAndUpdate(req.body.commentId, { $push : { _replies : newReply } })
                .populate({ path: '_replies' })
                .then((existingComment) => {
                    res
                        .status(200)
                        .json({
                            success: true,
                            data: existingComment,
                            reply
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
                .json({ message: err.message });
        });
}

module.exports = replyController;
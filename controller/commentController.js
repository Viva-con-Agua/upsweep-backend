let Comment = require('../model/comment');

exports.createComment = (req, res) => {
    let comment = new Comment(
        {
            text: req.body.text
        }
    );
    comment.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Comment Created successfully')
    })
}

exports.deleteComment = (req, res) => {
    Comment.deleteOne({
        _id: req.params.id
      }, function (err, comment) {
        if (err)
          return console.error(err);
          res.status(200).send();
      });
}
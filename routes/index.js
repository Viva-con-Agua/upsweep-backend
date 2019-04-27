var express = require('express');
var router = express.Router();
let commentController = require('../controller/commentController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    message : "welcome to comment-api"
  });
});

router.post('/comment', commentController.createComment);


router.delete('/comment/:id', commentController.deleteComment);


module.exports = router;

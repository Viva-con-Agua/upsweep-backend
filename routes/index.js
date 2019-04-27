var express = require('express');
var router = express.Router();
let commentController = require('../controller/commentController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    message : "welcome to comment-api"
  });
});

router.post('/comment', commentController.create);

router.get('/comment', commentController.findAll);

router.get('/comment/:id', commentController.findOne);

router.put('/comment/:id', commentController.update);

router.delete('/comment/:id', commentController.delete);

module.exports = router;

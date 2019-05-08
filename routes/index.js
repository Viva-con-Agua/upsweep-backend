var express = require('express');
var router = express.Router();

let commentController = require('../controllers/commentController');
let poolEventController = require('../controllers/poolEventController');
let userController = require('../controllers/userController');
let replyController = require('../controllers/replyController');
let voteController = require('../controllers/voteController');
let authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message : "welcome to comment-api"
  });
});

router.post('/comment', commentController.post);

//router.get('/comment', commentController.findAll);

//router.get('/comment/:id', commentController.findOne);

router.put('/comment/:id', commentController.update);

router.delete('/comment/:id', commentController.delete);

router.post('/poolevent', poolEventController.post);

router.get('/poolEvents', poolEventController.getAll);

router.post('/user', userController.post);

router.post('/reply', replyController.post);

router.post('/vote', voteController.post);

router.get('/oauth/code/', authController.getCode);

router.get('/oauth', authController.authenticate);

router.get('/comment', commentController.getCommentsByPoolEventId_auth);

router.get('/comment/:poolEvent', commentController.getCommentsByPoolEventId);

module.exports = router;

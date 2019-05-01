const db = require('./../models');

const userController = {};

userController.post = (req, res)=>{
    let newUser = new db.User(
        {
            userName : req.body.userName
        }
    );

    newUser.save()
    .then((newUser)=>{
        res.status(200).json({
            success : true, 
            data: newUser
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message : err
        })
    });
}

module.exports = userController;
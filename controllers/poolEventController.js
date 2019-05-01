let db = require('./../models/index');

const poolEventController = {}

poolEventController.post = (req, res) => {
    let poolEvent = new db.PoolEvent(
        {
            title: req.body.title,
            _creator: req.body._creator
        }
    );
    poolEvent.save()
        .then((poolEvent) => {
            res
                .status(200)
                .json({
                    success: true,
                    data: poolEvent
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
        });
}

poolEventController.getAll = (req, res) => {
    db.PoolEvent.find({}).populate({
        path: '_creator _comments'
    })
        .then((pe) => {
            res.status(200).json({
                success: true,
                data: pe
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
        });
}

module.exports = poolEventController;
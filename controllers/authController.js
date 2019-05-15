let axios = require('axios');
let authservice = require('./../services/authservise');
const authController = {};
const queryString = require('query-string')

authController.getCode = (req, res) => {
    let code = req.query.code;
    if (!code) {
        res
            .status(500)
            .json({
                message: "code parameter is missing"
            })
    } else {
        axios.get('http://localhost/drops/oauth2/access_token?' +
            queryString.stringify({
                grant_type: 'authorization_code',
                client_id: 'comment-backend',
                code: code,
                redirect_uri: 'http://localhost/api/oauth/code'
            })
        )
            .then((resp) => {
                authservice.getProfile(resp.data.access_token, (profile) => {
                    console.log(profile);
                    global.profile = profile;
                    global.access_token = resp.data.access_token
                    res.redirect(req.query.state);
                });
            })
            .catch((err) => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            })
    }
}

authController.authenticate = (req, res) => {
    res.redirect('http://localhost/drops/oauth2/code/get?' +
        queryString.stringify({
            client_id: 'comment-backend',
            response_type: 'code',
            state: 'http://localhost:4000/comment/' + req.query.poolEventId,
            redirect_uri: 'http://localhost/api/oauth/code'
        })
    )
}

module.exports = authController;


let axios = require('axios');
let authservice = require('./../services/authservise');
const authController = {};

authController.getCode = (req, res) => {
    let code = req.query.code;
    if (!code) {
        res
            .status(500)
            .json({
                message: "code parameter is missing"
            })
    } else {
        axios.get('http://localhost/drops/oauth2/access_token?grant_type=authorization_code&client_id=test&code='
            + code + '&redirect_uri=http://localhost/api/oauth/code')
            .then((resp) => {
                authservice.getProfile(resp.data.access_token, (profile) => {
                    console.log(profile);
                    global.profile = profile;
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
    res.redirect('http://localhost/drops/oauth2/code/get?client_id=test&response_type=code&state=http://localhost/api&redirect_uri=http://localhost/api/oauth/code');
}

module.exports =  authController;
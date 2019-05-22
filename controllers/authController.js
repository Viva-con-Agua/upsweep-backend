let axios = require('axios');
let authservice = require('./../services/authservise');
const authController = {};
const queryString = require('query-string')
const passport = require('passport');

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
                    global.profile = profile;
                    global.access_token = resp.data.access_token
                    req.login(profile, function (err) {
                        if (err) throw err;
                        res.redirect(req.query.state);
                    });
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

passport.serializeUser(function (profile, done) {
    done(null, profile);
});

passport.deserializeUser(function (profile, done) {
    done(null, profile);
});


module.exports = authController;


let axios = require('axios');
let authservice = {}

authservice.getProfile = (access_token, callback) => {
    axios.get('http://localhost/drops/oauth2/rest/profile?access_token='+access_token)
    .then((resp)=>{
        console.log(access_token);
        return callback(resp.data);
    })
    .catch((err)=>{
        return err.message;
    });
}

authservice.authenticate = (req, res) => {
    res.redirect(`http://localhost/drops/oauth2/code/get?client_id=comment-backend&response_type=code&state=http://localhost:4000/comment/${req.query.poolEventId}&redirect_uri=http://localhost/api/oauth/code`);
}

module.exports = authservice;
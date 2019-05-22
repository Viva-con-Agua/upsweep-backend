let axios = require('axios');
let authservice = {};

authservice.getProfile = (access_token, callback) => {
    axios.get('http://localhost/drops/oauth2/rest/profile?access_token='+access_token)
    .then((resp)=>{
        return callback(resp.data);
    })
    .catch((err)=>{
        return err.message;
    });
}

module.exports = authservice;
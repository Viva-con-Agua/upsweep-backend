let axios = require('axios');
let authservice = {}

authservice.getProfile = (access_token, callback) => {
    axios.get('http://localhost/drops/oauth2/rest/profile?access_token='+access_token)
    .then((resp)=>{
        return callback(resp.data);
    })
    .catch((err)=>{
        return err.message;
    });
}

authservice.getCurrentUser = (callback) => {
    res.redirect('http://localhost/drops/oauth2/code/get?client_id=test&response_type='+
    +'code&state=helloWorld&redirect_uri=http://localhost/api/oauth/code');  
}

authservice.authenticate = (req, res) => {
    res.redirect(`http://localhost/drops/oauth2/code/get?client_id=test&response_type=code&state=http://localhost/api/comment/${req.query.poolEventId}&redirect_uri=http://localhost/api/oauth/code`);
}

module.exports = authservice;
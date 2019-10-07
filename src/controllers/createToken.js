const User = require('../models/user');
const jwt = require('jwt-simple');
const moment = require('moment');
const segredo = 'seusegredodetoken';

module.exports = function(req, res) {
    const email = req.body.email || '';
  
    const password = req.body.password || '';
    if (email == '' || password == '') {
      return res.sendStatus(404);
    }
    
    User.findOne({email: email}, function (err, user) {
      if (err) {
        return res.sendStatus(404);
      }
      
      user.verificaSenha(password, function(isMatch) {
        if (!isMatch) {
            return res.sendStatus(404);
        }
      
      const expires = moment().add(5,'minutes').valueOf();
      const token = jwt.encode({
        iss: user.id,
        exp: expires
      }, segredo);
      
       return res.json({
        token : token,
        expires: expires,
        user: user.toJSON()
        });
        }); 
      });
  };



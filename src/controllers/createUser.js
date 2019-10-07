const user = require('../models/user');
module.exports = function(req, res){
      const data = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        });
        data.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'Novo Usuário', data: data });
        });
    };
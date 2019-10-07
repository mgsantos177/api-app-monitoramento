const createUser = require('./controllers/createUser');
const createToken = require ('./controllers/createToken')


module.exports = {
  getUsuarios: function(req, res){
    res.json({message: "rota para GET do /usuarios"})
  },
  postUsuarios: createUser,
  login: createToken,

  getAuht:function(req,res){
    res.json({message: "valido"}) ;
  }
}   
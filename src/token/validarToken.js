const user = require('../models/user');
const jwt = require('jwt-simple');
const segredo = 'seusegredodetoken';

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['token'];
    //1
    if (token) {
        try {
            var decoded = jwt.decode(token, segredo);
            console.log('decodando ' + decoded);
            //2
            if (decoded.exp <= Date.now()) {
                res.status(400).json({ error: 'Acesso Expirado, faça login novamente' });
            }
            //3
            user.findOne({ _id: decoded.iss }, function (err, user) {
                if (err)
                    res.status(500).json({ message: "erro ao procurar usuario do token." })
                req.user = user;
                console.log('achei usuario ' + req.user)
                return next();
            });
            //4
        } catch (err) {
            return res.status(401).json({ message: 'Erro: Seu token é inválido' });
        }
    } else {
        res.status(401).json({ message: 'Token não encontrado ou informado' })
    }
};
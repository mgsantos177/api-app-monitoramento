const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const router = express.Router();
const validarJWT = require('./token/validarToken');
const routes = require('./routes')
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;


mongoose.connect('mongodb+srv://mgsantos177:kurosaki@clustertesteapi-d0fp9.mongodb.net/appMonitoramento?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/* rotas */

app.use('/api', router);



router.route('/usuarios')
    .get(validarJWT, routes.getUsuarios)
    .post(routes.postUsuarios);
router.route('/login')
    .post(routes.login);

router.route('/auth')
    .get(validarJWT, routes.getAuht);




app.listen(port);
console.log('conectado a porta ' + port);
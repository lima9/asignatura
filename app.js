var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var session = require('express-session');

var users = require('./routes/users');
var config = require('./config/config')

/*Inicio Express*/
var app = express();
var server = require('http').Server(app);

// Set Static Folder
app.use(express.static(__dirname + '/public'));

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'), root = namespace.shift(), formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

/*Middlewares express*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

/* developing mode */
// use morgan to log requests to the console
var morgan = require('morgan');
app.use(morgan('dev'));

app.use(cors());
//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + config.port + '/api');
});

app.use('/api', users);

/*Conexión a la base de datos de MongoDB que tenemos en local*/
mongoose.Promise = global.Promise;
require('mongoose-middleware').initialize(mongoose);
mongoose.connect(config.database, function (err, res) {
    if (err) throw err;
    console.log('Conectado con éxito a la Base de Datos');
});

// Start server
server.listen(config.port, function () {
    console.log("Servidor en http://localhost:" + config.port);
});

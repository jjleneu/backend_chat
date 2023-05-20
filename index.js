const express = require('express');
const path = require('path');
require('dotenv').config();


//database config
const { bdConnect } = require('./database/config');

bdConnect();


// App de Express
const app = express();


//lectura json request
app.use(express.json())

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );



app.use('/app/login', require('./routes/auth'))





server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});



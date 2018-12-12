const express = require('express'); // load express
const bodyParser = require('body-parser'); // midd bodyparser
const expressValidator = require('express-validator'); // midd expressValidator
const consign = require('consign'); // loader

module.exports = () => {
    var app = express();

    app.use( bodyParser.urlencoded( { extended : true } ) ); // using midd
    app.use( bodyParser.json() ); //
    app.use( expressValidator() );


    consign()
        .include('src/app')
        .into(app);      
    return app;
};






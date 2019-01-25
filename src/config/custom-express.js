const express = require('express'); // load express
const bodyParser = require('body-parser'); // midd bodyparser
const expressValidator = require('express-validator'); // midd expressValidator
const consign = require('consign'); // loader
const helmet = require('helmet');
const session = require('express-session');

module.exports = () => {
    var app = express();

    app.use( helmet() );
    app.use( bodyParser.urlencoded( { extended : true } ) ); // using midd
    app.use( bodyParser.json() ); //
    app.use( expressValidator() );
    app.use(session({
        secret: 'fast$ecret',
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60  } // One hour
        
    }));
    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.append('Access-Control-Allow-Credentials' , true);

        next();
    });
    
    
    /*   
    app.use(function (req, res, next) {
        
        if (!req.session.order) {
          req.session.order = new app.src.app.models.Order( app );
          req.session.order.newOrder();
          console.log('Criado novo order');
        } else {
            req.session.order = new app.src.app.models.Order( app );
            console.log('Recuperando a order')
        }
        console.log(`Valor de order ${typeof req.session.order}`)
        //console.log(`Recuperando o id: ${JSON.stringify(req.session)}`)
       /*
        // get the url pathname
        var pathname = parseurl(req).pathname
       
        // count the views
        req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
       * /
        next()
      })
      */

    consign()
        .include('src/app')
        .into(app);      
    return app;
};






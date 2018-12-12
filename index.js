let app = require('./src/config/custom-express')();

app.listen(3000,function( ){
    console.log('Escutando na 3000');
})

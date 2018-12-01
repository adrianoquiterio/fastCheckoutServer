let http = require('http');
http.createServer(function (req, res) {
    res.end('ok');
    console.log('Servidor iniciado');
}).listen(3000, 'localhost');

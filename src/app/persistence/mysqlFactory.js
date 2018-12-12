const mysql = require('mysql');

function createMySqlConnection(){

    let host = 'localhost';
    let user = 'root';
    let password = '1234';
    let database = 'dfastcheck';

    let config = {
        host,
        user,
        password,
        database,
        connectionLimit : 10
    }
    let conn = mysql.createPool( config );
    
    return conn;
}
module.exports = () => {
    return createMySqlConnection;
}
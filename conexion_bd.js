var mysql = require('mysql');

//Ejemplos de parámetros de conexión. Completá con los parámetros que correspondan según tu usuario.
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'obcc-40b',
    database: 'acamica'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
module.exports = connection;
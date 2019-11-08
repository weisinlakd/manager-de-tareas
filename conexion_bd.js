var mysql = require('mysql');
var fs = require('fs');

//Ejemplos de parámetros de conexión. Completá con los parámetros que correspondan según tu usuario.
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'acamica'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });


var sql = `DROP DATABASE IF EXISTS acamica;
CREATE DATABASE acamica;
USE acamica;
CREATE TABLE tarea (
 idTarea INT PRIMARY KEY AUTO_INCREMENT,
 descripcion VARCHAR(100) NOT NULL,
 prioridad INT(1) NOT NULL,
 estado TINYINT
);
INSERT INTO tarea
 (descripcion, prioridad, estado)
VALUES
 ('Hacer las compras', 1, 1);
INSERT INTO tarea
 (descripcion, prioridad, estado)
VALUES
 ('Ir a Acamica', 1, 0);
INSERT INTO tarea
 (descripcion, prioridad)
VALUES
 ('Ir al gimnasio', 5);
CREATE TABLE agenda (
   idAgenda INT PRIMARY KEY AUTO_INCREMENT,
   fecha DATE NOT NULL,
   idTarea INT NOT NULL,
   FOREIGN KEY(idTarea) REFERENCES tarea(idTarea)
);`

connection.query(sql, function(error, resultado) {
  if(error) {
    console.log(error)
  } else {
    res.send(JSON.stringify(resultado));
  }
})
module.exports = connection;
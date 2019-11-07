var express = require('express');
var bodyParser = require('body-parser');
var tareasControlador = require('./controladores/tareasControlador.js');
var cors = require('cors');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors())


app.use((req,res,next)=>{ console.log("hola"); next()}) //middleware; se ejecuta con cada pedido

app.get('/tareas', tareasControlador.buscarTareas);

app.get('/tarea/:id', tareasControlador.buscarTarea);

app.delete('/tarea/:id', tareasControlador.borrarTarea);

app.put('/tarea/:id', tareasControlador.modificarTarea); 

app.post('/tarea/nueva', tareasControlador.crearTarea);

app.get('/tareas/resultado', tareasControlador.buscarTareaXDescripcion);

app.get('/tareas/prioritarias', tareasControlador.buscarTareaXPrioridad);




var puerto = '8080';

app.listen(puerto, function() {
    console.log("Escuchando pedidos en el puerto " + puerto);
});
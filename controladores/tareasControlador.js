//se importa una referencia a la conexión.
var con = require('../conexion_bd');

function buscarTareas(req, res) {
    
    if (req.query.prioridad !== undefined) {
        buscarTareaXPrioridad(req,res);
        return;
    }
    
    var sql = "select * from tarea"
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        } else {
            var respuesta = {
                'tareas': resultado
            }
            res.send(JSON.stringify(respuesta.tareas));
        }
    });
}

function buscarTarea(req, res) {
    var id = req.params.id;

    if (id===undefined){
        return res.status(422).json("no hay id")
    }

    var sql = "select * from tarea where idTarea = " + id;
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        
        if (resultado.length == 0) {
            console.log("No se encontro ninguna tarea con ese id");
            return res.status(404).send("No se encontro ninguna tarea con ese id");
        } else {
            var respuesta = {
                'tarea': resultado
            };
            res.send(JSON.stringify(respuesta.tarea));
        }

    });
}

function buscarTareaXPrioridad(req, res) {
    
    var prioridad = req.query.prioridad;

    if (prioridad===undefined){
        return res.status(422).json("no hay prioridad")
    }
    
    var sql = "select * from tarea where prioridad = " + prioridad;
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta por prioridad");
        }        
        if (resultado.length == 0) {
            console.log("No se encontro ninguna tarea con esa prioridad");
            return res.status(404).send("No se encontro ninguna tarea con esa prioridad");
        } else {
            var respuesta = {
                'tarea': resultado,
                'prioridad': prioridad
            };
            res.send(JSON.stringify(respuesta));
            
            
        }

    });
}

function modificarTarea(req, res) {
    var id = req.params.id;

    if (id===undefined){
        return res.status(404).json("no hay id")
    }

    var descripcion = req.body.descripcion 
    var estado = req.body.estado
    var prioridad = req.body.prioridad
    
    console.log(req.body)

    console.log(descripcion, estado, prioridad,"body");
    
    
    if (descripcion === undefined){
        return res.status(422).json("no se ha provisto una descripcion");
    }
    if (estado === undefined ){
        return res.status(422).json("no se ha provisto una estado");
    }
    if (prioridad === undefined){
        return res.status(422).json("no se ha provisto una prioridad");
    }
    

    

    var sql = 
    `UPDATE tarea SET descripcion = "${descripcion}", estado = ${estado}, prioridad = ${prioridad} where idTarea = ${id}` 


    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        }
        
        if (resultado.changedRows == 0) {
            console.log("No hubo cambios");
            return res.status(404).send("No hubo cambios");
        } else {
            var respuesta = {
                'tarea': resultado
            };
            res.send(JSON.stringify(respuesta));
        }

    });
}

function crearTarea (req,res) {
    
    var tarea = req.body;
    console.log(tarea, 'tarea');
    
    var sql = 
    `insert into tarea (descripcion,prioridad,estado) values ("${tarea.descripcion}" ,${tarea.prioridad}, ${tarea.estado})`
    
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        } else {
            var respuesta = {
                id: resultado.insertId,
                message: resultado.message = "tarea creada!"
            };
            console.log(respuesta)
            res.send(JSON.stringify(respuesta));
        }

    });
}

function borrarTarea(req, res) {
    var id = req.params.id;
    if (id===undefined){
        return res.status(422).json("no hay id")
    }
    var sql = "delete from tarea where idTarea = " + id;
    con.query(sql, function(error, resultado, fields) {
        if (error) {            
            console.log("Hubo un error en la consulta", error.message);
            return res.status(500).send("Hubo un error en la consulta");
        } else {

            var respuesta = {
                resultado,
                mensaje: resultado.message = "tarea eliminada!"
            };
            res.send(JSON.stringify(respuesta));
        }

    });
}

function buscarTareaXDescripcion(req, res) {

    var descripcion = req.query.descripcion;
    console.log(descripcion,"descripcion")
    if (descripcion===undefined){
        return res.status(422).json("no hay descripcion")
    }
    var sql = `select * from tarea where descripcion like "%${descripcion}%"`
    con.query(sql, function(error, resultado, fields) {
        if (error) {            
            console.log("Hubo un error en la consulta x descripcion", error.message);
            return res.status(500).send("Hubo un error en la consulta x descripcion");
        } else {

            var respuesta = {
                resultado,
               
            };
            res.send(JSON.stringify(respuesta));
            console.log(respuesta)
        }

    });
}

//se exportan las funciones creadas


// function limitarResultados(pagina,ultimo){

// }

module.exports = {
    buscarTareas,
    buscarTarea,
    buscarTareaXPrioridad,
    modificarTarea,
    crearTarea,
    borrarTarea,
    buscarTareaXDescripcion
};

var servidor = 'http://localhost:8080';


function prioridadAtexto (tarea) {
    switch(tarea.prioridad) {
        case 0:
            tarea.prioridad = "no es importante";
            break;
        case 1:
            tarea.prioridad = "levemente importante";
            break;
        case 2:
            tarea.prioridad = "normal";
            break;
        case 3:
            tarea.prioridad = "levemente prioritaria";
            break;
        case 4:
            tarea.prioridad = "prioritaria";
            break;
        case 5:
            tarea.prioridad = "URGENTE";
            break;
        default:
            throw new Error("No hay descripción");
    }
}

function estadoAtexto(tarea){
    switch(tarea.estado){
        case 1:
            tarea.estado = "TERMINADO";
            break;
        case 0:
            tarea.estado = "en progreso";
            break;
        case null:
            tarea.estado = "sin comenzar";
            break;
        default:
            throw new Error("No hay descripción");
    }
}

function GetTareas (){
    axios.get(`${servidor}/tareas`)
  .then(function (response) {
    // handle success
    var data = response.data;
    var ul = document.getElementsByClassName('tareas');
    ul[0].innerHTML=`<h1>Se encontraron ${data.length} resultados:<h1>`
    data.forEach(tarea => {
        var li = document.createElement('li')
        
        prioridadAtexto(tarea);
        estadoAtexto(tarea);
        
        li.innerHTML = `<div class="card"><h3 class='tarea-mostrada'>Tarea: ${tarea.descripcion} </h3>
            <p class='tarea-propiedades'>Número de Tarea: ${tarea.idTarea}</p>
            <p class='tarea-propiedades'>Prioridad: ${tarea.prioridad} </p>
            <p class='tarea-propiedades'>Estado: ${tarea.estado}</p>        </div>
        `
        
        ul[0].appendChild(li)
        ul[0].appendChild(document.createElement('br'))
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed

  });
}

function NewTarea (e){
    
    var descripcion = e.target[1].value; 
    var prioridad = e.target[2].value;
    var estado = e.target[3].value;
      
    console.log(estado)
    axios.post(`${servidor}/tarea/nueva`, {
        descripcion,
        prioridad,
        estado,
      })
    .then(function (response) {
    // handle success
        console.log(response.data.id)
        
        
        
        var ul = document.getElementsByClassName('tareas');

        ul[0].innerHTML = `<h1>Se creó la  tarea con id ${response.data.id}.</h1>`         
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    });
}
 
function EditarTarea (e){
    

    console.log(e)



    var idTarea = e.target[1].value; 

    console.log(idTarea, "<= idTarea")
    var descripcion = e.target[2].value;
    var prioridad = e.target[3].value;
    var estado = e.target[4].value;
      
    
    axios.put(`${servidor}/tarea/${idTarea}`, {
        idTarea,
        descripcion,
        prioridad,
        estado,
      })
  .then(function (response) {
    // handle success
    console.log(response)
    alert("tarea editada!"); alert(response.config.data)
    })
    .catch(function(error){
        console.log(error)
        if (error == 404) {
            alert(`No existe una tarea con el id ${idTarea}.`)
        } else {
            alert(`No hubo cambios en la tarea con el id ${idTarea}.`)
        }
        })
    
}

function BuscarTarea(e){

    var descripcion = e.target[0].value
    console.log(descripcion);

    axios.get(`${servidor}/tareas/resultado?descripcion=${descripcion}`)
    .then(function (response) {

        var data = response.data.resultado;
        console.log(data)
        var ul = document.getElementsByClassName('tareas');
        ul[0].innerHTML=`<h1>Se encontraron ${data.length} tareas que contienen "${descripcion}":</h1>`
        data.forEach(tarea => {
            var li = document.createElement('li')
            
            prioridadAtexto(tarea);
            estadoAtexto(tarea);
            
            
            li.innerHTML = `<div class="card"><h3 class='tarea-mostrada'>Tarea: ${tarea.descripcion} </h3>
                <p class='tarea-propiedades'>Número de Tarea: ${tarea.idTarea}</p>
                <p class='tarea-propiedades'>Prioridad: ${tarea.prioridad} </p>
                <p class='tarea-propiedades'>Estado: ${tarea.estado}</p>  </div>
            `
            
            ul[0].appendChild(li)
            ul[0].appendChild(document.createElement('br'))
        });
        // handle success
    
    
    })
    .catch(function(error){
        console.log(error)
        if (error == 404) {
            alert("no hubo resultados")
        } else {
        //     alert(`No existe una tarea con la descripcion ${descripcion}.`)
         }
        })
}

function BuscarTareaXId(e){

    var id = e.target[0].value
    console.log(id);

    axios.get(`${servidor}/tarea/${id}`)
    .then(function (response) {

        var tarea = response.data[0]
        console.log(tarea)
        
            var li = document.createElement('li')
            var ul = document.getElementsByClassName('tareas');

            ul[0].innerHTML=" ";

            
            
            li.innerHTML = `<div class="card"><h3 class='tarea-mostrada'>Tarea: ${tarea.descripcion} </h3>
                <p class='tarea-propiedades'>Número de Tarea: ${tarea.idTarea}</p>
                <p class='tarea-propiedades'>Prioridad: ${tarea.prioridad} </p>
                <p class='tarea-propiedades'>Estado: ${tarea.estado}</p>  </div>  
            `
            
            ul[0].appendChild(li)
            ul[0].appendChild(document.createElement('br'))
        
        // handle success
    
        return tarea
    })
    .catch(function(error){
        console.log(error)
        if (error == 404) {
            alert("no hubo resultados")
        } else {
            alert(`No existe una tarea con el id ${id}.`)
         }
        });
}


//FALTA BUSCAR TAREA X PRIORIDAD

function BuscarTareaXPrioridad(e){

    var prioridad = e.target[0].value
    console.log(prioridad);

    axios.get(`${servidor}/tareas/prioritarias?prioridad=${prioridad}`)
    .then(function (response) {

        var data = response.data.tarea
        console.log(data)
        var ul = document.getElementsByClassName('tareas');
        ul[0].innerHTML=`<h1>Se encontraron ${data.length} tareas que tienen prioridad "${prioridad}":</h1>`
        data.forEach(tarea => {
            var li = document.createElement('li')
            
            prioridadAtexto(tarea);
            estadoAtexto(tarea);
            
            
            li.innerHTML = `<div class="card"><h3 class='tarea-mostrada'>Tarea: ${tarea.descripcion} </h3>
                <p class='tarea-propiedades'>Número de Tarea: ${tarea.idTarea}</p>
                <p class='tarea-propiedades'>Prioridad: ${tarea.prioridad} </p>
                <p class='tarea-propiedades'>Estado: ${tarea.estado}</p></div>        
            `
            
            ul[0].appendChild(li)
            ul[0].appendChild(document.createElement('br'))
        });
        // handle success
    
    
    })
    .catch(function(error){
        console.log(error)
        if (error == 404) {
            alert("no hubo resultados")
        } else {
        //     alert(`No existe una tarea con la descripcion ${descripcion}.`)
         }
    });
}



function BorrarTarea (e) {
    console.log(e)

    var id = e.target[0].value
    console.log(id)

    var prompt = window.prompt(`Está seguro de borrar la tarea ${id}?: \n SÍ: pulse 1 \n NO: pulse 2`);
    console.log(typeof prompt)
    switch(prompt){
        case "1":
            axios.delete(`${servidor}/tarea/${id}`)
                .then(function (response) {

                var ul = document.getElementsByClassName('tareas');
                ul[0].innerHTML=`<h1>Se borró la tarea que tenía id "${id}"</h1>`
                  
                    
                    
                    ul[0].appendChild(li)
                    ul[0].appendChild(document.createElement('br'))
        })
        .catch(function(error){
                    console.log(error)
                    if (error == 404) {
                        var ul = document.getElementsByClassName('tareas');
                        ul[0].innerHTML="<h1>No se encontró la tarea.</h1>"
                    } else {
                        var ul = document.getElementsByClassName('tareas');
                        ul[0].innerHTML="<h1>No se pudo borrar la tarea.</h1>"
                    }
                })
            alert("Se borrará la tarea.");
            
        break;
        case "2":
            return;
        default:
            return;
        
    }

     
    
}




//manejo DOM

var contenido = ["mostrar-tareas", "tarea-nueva", "editar-tarea", "buscar-id", "buscar-prioridad", "borrar-tarea"];


function activeOrHidden (id) {
    

    document.getElementById(id).className = "activo";

    var arreglo = contenido.filter((cont)=> cont != id);


    arreglo.forEach((id)=> {
            document.getElementById(id).className = "hidden";
        });
    
    
}


var contenidoNav = ["link-tarea-1","link-tarea-2","link-tarea-3","link-tarea-4","link-tarea-5"];

function activarNav (id) {
    if (id != "ninguno") {
        document.getElementById(id).className = "active";

    var arreglo = contenidoNav.filter((cont)=> cont != id);


    arreglo.forEach((id)=> {
            document.getElementById(id).classList.remove("active");
        });
    }

    else {
        contenidoNav.forEach((id)=> {
            document.getElementById(id).classList.remove("active");
        })
    
    }
    
}
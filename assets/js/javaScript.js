let tareas = [
    {
        id: 1,
        descripcion: "Hacer mercado",
        estado: true
    },
    {
        id: 2,
        descripcion: "Estudiar para la Prueba",
        estado: false
    },
    {
        id: 3,
        descripcion: "Sacar a pasear a Tobby",
        estado: false
    },
];

const inputAgregar = document.querySelector("#inputAgregar");
const botonAgregar = document.querySelector("#buttonADD");
const spanTotal = document.querySelector("#tTotorales");
const spanRealizada = document.querySelector("#tRealizadas");
const divTareas = document.querySelector("#tareas");
const botonBorrar = document.querySelector("#botonBorrar")

let NewID = 4; //crear id random
actualizarLista();
tareasRealizadas();
tareasTotales();

botonAgregar.addEventListener("click", function(){
   
    crearTarea();
    actualizarLista();
    tareasRealizadas();
    tareasTotales();
    
});

botonBorrar.addEventListener("click", function(){
    
    borrarTareas();
    actualizarLista();
    tareasRealizadas();
    tareasTotales();
});

function crearTarea(){
    let nuevaTarea = inputAgregar.value;

    tareas.push({
        id: NewID,
        descripcion: nuevaTarea,
        estado: false
    });

    NewID++;
}

function actualizarLista(){
    let html = "";

    tareas.forEach(function(tarea){
        let checkboxcheck = "";

        if(tarea.estado){
            checkboxcheck = "checked";
        }

        let template = `
        <div style="width: 10%;">${tarea.id}</div>
        <div style="width: 70%;">${tarea.descripcion}</div>
        <div style="width: 10%;">
            <input type="checkbox" id="completado-${tarea.id}"${checkboxcheck} onchange="actualizarTareas(${tarea.id})">
        </div>
        <div style="width: 10%" class="mt-2">
            <button class="btn btn-danger id="botonBorrar" onclick="borrarTareas(${tarea.id})">X</button>
        </div>`;

        html += template;
    })

    divTareas.innerHTML = html;
}


function actualizarTareas(id){

    const indexTareas = tareas.findIndex(tarea => tarea.id == id);

    const completada = document.querySelector("#completado-"+ id).checked;

    tareas[indexTareas].estado= completada;

    
    //tareasTotales();
    tareasRealizadas();

}

function tareasTotales(){
    let total = tareas.length;

    spanTotal.innerHTML = total;
};
 
function tareasRealizadas(){
    let tareasCompletadas = tareas.filter(tarea => tarea.estado)
    let realizadas = tareasCompletadas.length;

    spanRealizada.innerHTML = realizadas;
};

function borrarTareas(id){

    const indexTarea = tareas.findIndex(tarea => tarea.id == id);

    tareas.splice(indexTarea,1);

    actualizarLista();
    tareasTotales(); 
    tareasRealizadas();
}
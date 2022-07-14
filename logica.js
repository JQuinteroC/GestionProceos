google.charts.load('current', { 'packages': ['timeline'] });
google.charts.setOnLoadCallback(drawChart);

var procesos = [{
    "nombre": "A",
},
{
    "nombre": "B",
},
{
    "nombre": "C",
},
{
    "nombre": "D",
},
{
    "nombre": "E",
},
{
    "nombre": "F",
},
]

function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'dummy bar label' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    // Date(year, month, day, hours, minutes, seconds, milliseconds)
    // #BFBFBF - Espera
    // #FF0000 - Bloqueado
    // #00B050 - Ejecución
    // #00B0F0 - Despachador
    dataTable.addRows([
        ['B', '', '#BFBFBF', new Date(0, 0, 0, 0, 0, 1, 0), new Date(0, 0, 0, 0, 0, 2, 0)],
        ['A', '', '#00B050', new Date(0, 0, 0, 0, 0, 20, 0), new Date(0, 0, 0, 0, 0, 23, 0)],
        ['A', '', '#BFBFBF', new Date(0, 0, 0, 0, 0, 5, 0), new Date(0, 0, 0, 0, 0, 20, 0)],
        ['A', '', '#FF0000', new Date(0, 0, 0, 0, 0, 3, 0), new Date(0, 0, 0, 0, 0, 5, 0)],
        ['A', '', '#00B050', new Date(0, 0, 0, 0, 0, 1, 0), new Date(0, 0, 0, 0, 0, 3, 0)],
        ['A', '', '#BFBFBF', new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 1, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 20, 0), new Date(0, 0, 0, 0, 0, 21, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 17, 0), new Date(0, 0, 0, 0, 0, 18, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 14, 0), new Date(0, 0, 0, 0, 0, 15, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 10, 0), new Date(0, 0, 0, 0, 0, 11, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 6, 0), new Date(0, 0, 0, 0, 0, 7, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 4, 0), new Date(0, 0, 0, 0, 0, 5, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 1, 0)]
    ]);

    var options = {
        tooltip : {trigger: 'none'},
    }
    
    chart.draw(dataTable, options);
}

function agregarListener(){
    //Acción para iniciar el programa
    var btnIniciar = document.getElementById("iniciar");
    btnIniciar.addEventListener("click", function() {
        llenarTabla();
        $("#btnDatos").show();
    });

    //Acción para insertar los datos del proceso
    var btnInsertar = document.getElementById("btnDatos");
    btnInsertar.addEventListener("click", function(){
        bloquearCampos();
    })
}

//Funcion para bloquear los inputs de la tabla de procesos
function bloquearCampos(){
    for(let i = 0; i < procesos.length; i++){
        var li = document.getElementById('li' + i);
        var t = document.getElementById('t' + i);
        var inicio = document.getElementById('inicio' + i);
        var duracion = document.getElementById('duracion' + i);

        if(li.value == "" || t.value == "" || inicio.value == "" || duracion.value == ""){
            li.value = "0";
            t.value = "0";
            inicio.value = "0";
            duracion.value = "0";
        }

        li.disabled = true;
        t.disabled = true;
        inicio.disabled = true;
        duracion.disabled = true;
    }
}

//Función para completar de procesos con los input
function llenarTabla(){
    document.getElementById("procesos").replaceChildren();
    for(let i=0; i < procesos.length; i++){
        const proceso = procesos[i];

        var fila = "<tr><td>" + proceso.nombre + "</td><td> <input type = 'text' id = 'li" + i + "'> </td>" + 
                                                "<td> <input type = 'text' id = 't" + i + "'> </td>" + 
                                                "<td> <input type = 'text' id = 'inicio" + i + "'> </td>" +
                                                "<td> <input type = 'text' id = 'duracion" + i + "'> </td>"  
                                                + "</tr>";  

        var tr = document.createElement("TR");
        tr.innerHTML = fila;
        document.getElementById("procesos").appendChild(tr);
    }
}

function init(){
    agregarListener();
    $("#btnDatos").hide();
}

init();
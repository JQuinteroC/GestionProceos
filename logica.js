google.charts.load('current', { 'packages': ['timeline'] });
const delay = (n) => new Promise(r => setTimeout(r, n * 1000));
var procesos = [{
    "nombre": "A",
    "li": "0",
    "t": "6",
    "inicio": "3",
    "duracion": "2"
}, {
    "nombre": "B",
    "li": "1",
    "t": "8",
    "inicio": "1",
    "duracion": "3"
}, {
    "nombre": "C",
    "li": "2",
    "t": "7",
    "inicio": "5",
    "duracion": "1"
}, {
    "nombre": "D",
    "li": "4",
    "t": "3",
    "inicio": "0",
    "duracion": "0"
}, {
    "nombre": "E",
    "li": "6",
    "t": "9",
    "inicio": "2",
    "duracion": "4"
}, {
    "nombre": "F",
    "li": "6",
    "t": "2",
    "inicio": "0",
    "duracion": "0"
}]
var procesosTemp = [];
var gestor;
var selecAlgoritmo = 0;

function dibujarGantt(filas) {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'dummy bar label' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    // Date(year, month, day, hours, minutes, seconds, milliseconds)

    filas.forEach(fila => {
        var color = '#FFF';
        // #BFBFBF - Espera
        if (fila.estado == "W")
            color = '#BFBFBF';
        // #FF0000 - Bloqueado
        if (fila.estado == "B")
            color = '#FF0000';
        // #00B050 - Ejecución
        if (fila.estado == "E")
            color = '#00B050';
        // #00B0F0 - Despachador
        if (fila.estado == "D")
            color = '#00B0F0';

        if (color != '#FFF')
            dataTable.addRows([[fila.nombre, '', color, new Date(0, 0, 0, 0, 0, fila.inicio, 0), new Date(0, 0, 0, 0, 0, fila.fin, 0)]]);
    });

    var options = {
        tooltip: { trigger: 'none' },
    }

    chart.draw(dataTable, options);
}

function agregarListener() {
    //Acción para iniciar el programa
    var btnIniciar = document.getElementById("iniciar");
    btnIniciar.addEventListener("click", function () {
        var algoritmo = document.getElementById("select");

        if(algoritmo.value == "Selecciona un algoritmo"){
            alert("Seleccione un algoritmo para continuar");
        }else{
            switch(algoritmo.value){
                case "1":
                    selecAlgoritmo = 1;
                    break;
                
                case "2":
                    selecAlgoritmo = 2;
                    break;

                case "3":
                    selecAlgoritmo = 3;
                    break;

                case "4":
                    var q = document.getElementById("quantum").value;

                    if(q.length == 0){
                        alert("Tiene que llenar el valor de q");

                    }else{
                        selecAlgoritmo = 4;
                    }

                    break;
            }

            if(selecAlgoritmo != 0){
                llenarTablaProcesos();
                $("#btnDatos").show();
                $("#timeline").empty();
            }

        }
        
    });

    //Acción para insertar los datos del proceso
    var btnInsertar = document.getElementById("btnDatos");
    btnInsertar.addEventListener("click", function () {
        bloquearCampos();
        llenarGantt();
    });
}

//Funcion para bloquear los inputs de la tabla de procesos
function bloquearCampos() {
    for (let i = 0; i < this.procesos.length; i++) {
        var li = document.getElementById('li' + i);
        var t = document.getElementById('t' + i);
        var inicio = document.getElementById('inicio' + i);
        var duracion = document.getElementById('duracion' + i);

        // Validar campos llenos
        if (li.value == "" || t.value == "") {
            li.value = "0";
            t.value = "0";
            inicio.value = "0";
            duracion.value = "0";
        }
        inicio.value = inicio.value == "" ? "0" : inicio.value;
        duracion.value = duracion.value == "" ? "0" : duracion.value;

        // Guardar valores
        this.procesos[i] = {
            "nombre": this.procesos[i].nombre,
            "li": li.value,
            "t": t.value,
            "inicio": inicio.value,
            "duracion": duracion.value
        };

        // Desabilitar campos
        li.disabled = true;
        t.disabled = true;
        inicio.disabled = true;
        duracion.disabled = true;
    }

    gestor = new GestionProcesos(this.procesos);
    gestor.ordernarLista();
}

//Función para completar de procesos con los input
function llenarTablaProcesos() {
    document.getElementById("procesos").replaceChildren();
    for (let i = 0; i < procesos.length; i++) {
        const proceso = procesos[i];

        var fila = "<tr><td>" + proceso.nombre + "</td><td> <input  value = " + proceso.li + " type = 'text' id = 'li" + i + "'> </td>" +
            "<td> <input value = " + proceso.t + "  type = 'text' id = 't" + i + "'> </td>" +
            "<td> <input value = " + proceso.inicio + "  type = 'text' id = 'inicio" + i + "'> </td>" +
            "<td> <input value = " + proceso.duracion + "  type = 'text' id = 'duracion" + i + "'> </td>"
            + "</tr>";

        var tr = document.createElement("TR");
        tr.innerHTML = fila;
        document.getElementById("procesos").appendChild(tr);
    }
}

async function llenarGantt() {
    switch(selecAlgoritmo){
        case 1:
            while (!gestor.finalizo()) {
                await delay(1);
                procesosTemp.push(...gestor.FCFS())
                google.charts.setOnLoadCallback(dibujarGantt(procesosTemp));
            }
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
}

function init() {
    agregarListener();
    $("#btnDatos").hide();
}

init();
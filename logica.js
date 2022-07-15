google.charts.load('current', { 'packages': ['timeline'] });
const delay = (n) => new Promise(r => setTimeout(r, n * 1000));
var procesos = [{
    "nombre": "A",
    "li": "1",
    "t": "1",
    "inicio": "0",
    "duracion": "0"
}, {
    "nombre": "B",
    "li": "3",
    "t": "3",
    "inicio": "0",
    "duracion": "0"
}, {
    "nombre": "C",
    "li": "2",
    "t": "4",
    "inicio": "0",
    "duracion": "0"
}, {
    "nombre": "D",
    "li": "1",
    "t": "0",
    "inicio": "0",
    "duracion": "0"
}, {
    "nombre": "E",
    "li": "0",
    "t": "0",
    "inicio": "0",
    "duracion": "0"
}, {
    "nombre": "F",
    "li": "0",
    "t": "0",
    "inicio": "0",
    "duracion": "0"
}]

var gestor;

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
        llenarTablaProcesos();
        $("#btnDatos").show();
        $("#timeline").empty()
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

function llenarGantt() {
    // await delay(5);
    procesosTemp = gestor.FCFS()
    google.charts.setOnLoadCallback(dibujarGantt(procesosTemp));
}

function init() {
    agregarListener();
    $("#btnDatos").hide();
}

init();
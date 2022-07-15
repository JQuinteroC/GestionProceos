class Proceso {

    constructor(nombre, inicio, fin, estado) {
        this.nombre = nombre;
        this.inicio = inicio;
        this.fin = fin;
        this.estado = estado;
    }
};

class GestionProcesos {

    constructor(listaProcesos) {
        var procesosTemp = [];

        for (let i = 0; i < listaProcesos.length; i++) {
            var proceso = listaProcesos[i];
            if (proceso.t != 0) {
                proceso.estado = '';
                proceso.li = parseInt(proceso.li);
                proceso.t = parseInt(proceso.t);
                proceso.inicio = parseInt(proceso.inicio);
                proceso.duracion = parseInt(proceso.duracion);
                proceso.restante = proceso.t;
                procesosTemp.push(proceso);
            }
        }

        this.listaProcesos = procesosTemp;
    }

    ordernarLista() {
        this.listaProcesos.sort(function (a, b) {
            if (a.li > b.li) {
                return 1;
            }
            if (a.li < b.li) {
                return -1;
            }
            return 0;
        })
    }

    FCFS() {
        var procesos = [];
        var tiempo = 0;

        this.listaProcesos[0].estado = "E";
        while (this.listaProcesos.length > 0) {
            for (let i = 0; i < this.listaProcesos.length; i++) {
                var proceso = this.listaProcesos[i];

                if (proceso.estado == "E"){
                    if(proceso.li < proceso.inicio){
                        var duracion = proceso.li - proceso.inicio;
                        procesos.push(new Proceso(proceso.nombre, proceso.li, duracion, proceso.estado));
                        proceso.li += duracion;
                        proceso.estado = "B";
                        procesos.push(new Proceso(proceso.nombre, proceso.li, proceso.duracion, proceso.estado));
                    } else {
                        procesos.push(new Proceso(proceso.nombre, proceso.li, proceso.li + proceso.t, proceso.estado));
                        proceso.estado = "F";
                    }
                }

            }
            // Borrar cuando ya se salga del ciclo while
            break
        }

        return procesos;
    }

    SJF() {

    }

    SRTF() {

    }

    RR() {

    }
};
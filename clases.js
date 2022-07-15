class Proceso {

    constructor(nombre, li, t, estado) {
        this.nombre = nombre;
        this.li = li;
        this.t = t;
        //this.inicio = inicio;
        //this.duracion = duracion;
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
            for (let i = 0; i < this.listaProcesos; i++) {
                var proceso = this.listaProcesos[i];

                if (proceso.estado == "E"){
                    if(proceso.li < proceso.inicio){
                        var duracion = proceso.li - proceso.inicio;
                        procesos.push(new Proceso(proceso.nombre, proceso.li, duracion, proceso.estado));
                        proceso.li += duracion;
                        proceso.estado = "B";
                        procesos.push(new Proceso(proceso.nombre, proceso.li, proceso.duracion, proceso.estado));
                    }
                }


            }
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
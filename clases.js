class Proceso {

    constructor(nombre, inicio, fin, estado, restante, inicial) {
        this.nombre = nombre;
        this.inicio = inicio;
        this.fin = fin;
        this.estado = estado;
        this.restante = restante;
        this.inicial = inicial;
    }
};

class GestionProcesos {

    constructor(listaProcesos) {
        var procesosTemp = [];

        for (let i = 0; i < listaProcesos.length; i++) {
            var proceso = listaProcesos[i];
            if (proceso.t != 0) {
                proceso.estado = 'W';
                proceso.li = parseInt(proceso.li);
                proceso.t = parseInt(proceso.t);
                proceso.inicio = parseInt(proceso.inicio);
                proceso.duracion = parseInt(proceso.duracion);
                proceso.recorrido = 0;
                procesosTemp.push(proceso);
            }
        }

        this.listaProcesos = procesosTemp;
        this.tiempo = 0;
    }

    finalizo() {
        for (let index = 0; index < this.listaProcesos.length; index++) {
            const proceso = this.listaProcesos[index];

            if (proceso.estado != "") {
                return false;
            }
        }
        return true;
    }

    procesosActivos() {
        var activos = 0;
        for (let index = 0; index < this.listaProcesos.length; index++) {
            const proceso = this.listaProcesos[index];

            if (proceso.estado != "") {
                activos++;
            }
        }
        return activos;
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
        var ejecutable = { "idProceso": -1, "ejecutar": false };

        // Primera ejecución
        if (this.tiempo == 0) {
            this.listaProcesos[0].estado = "E";
        }

        for (let i = 0; i < this.listaProcesos.length; i++) {
            var proceso = this.listaProcesos[i];

            if (this.tiempo >= proceso.li && proceso.estado != "") {
                // Ejecución
                if (proceso.estado == "E") {
                    proceso.t -= 1;
                    proceso.recorrido += 1;

                    // Guardar tiempo inicial
                    if (proceso.recorrido == 1){
                        proceso.inicial = this.tiempo - proceso.li;
                    }

                    procesos.push(new Proceso(proceso.nombre, this.tiempo, this.tiempo + 1, proceso.estado, proceso.t, proceso.inicial ));

                    // Cuando el proceso termino su ejecución
                    if (proceso.t <= 0) {
                        proceso.estado = "";
                        proceso.tiempoFin = this.tiempo;
                        for (let j = 0; j < this.listaProcesos.length; j++) {
                            const procSig = this.listaProcesos[j];
                            if (this.tiempo >= procSig.li && procSig.estado != "" && procSig.estado != "B") {
                                ejecutable = { "idProceso": j, "ejecutar": true };
                                break;
                            }
                        }
                    }

                    // Cuando el proceso se debe bloquear
                    if (proceso.inicio == proceso.recorrido && proceso.recorrido >= 1 && proceso.duracion > 0) {
                        proceso.estado = "B";
                        for (let j = 0; j < this.listaProcesos.length; j++) {
                            const procSig = this.listaProcesos[j];
                            if (this.tiempo >= procSig.li && procSig.estado != "" && procSig.estado != "B") {
                                ejecutable = { "idProceso": j, "ejecutar": true };
                                break;
                            }
                        }
                    }
                    continue;
                }

                // Bloqueado
                if (proceso.estado == "B") {
                    procesos.push(new Proceso(proceso.nombre, this.tiempo, this.tiempo + 1, proceso.estado, proceso.t, -1 ));
                    proceso.duracion -= 1;

                    if (proceso.duracion <= 0) {
                        proceso.estado = "W"
                    }
                    continue;
                }

                procesos.push(new Proceso(proceso.nombre, this.tiempo, this.tiempo + 1, proceso.estado, proceso.t, -1));
            }
        }

        // Ejecutar proceso en la siguiente iteración
        if (ejecutable.ejecutar) {
            this.listaProcesos[ejecutable.idProceso].estado = "E";
            ejecutable = { "idProceso": -1, "ejecutar": false };
        }

        // Finalizar la simulación
        if (this.procesosActivos() == 1) {
            for (let i = 0; i < this.listaProcesos.length; i++) {
                const proceso = this.listaProcesos[i];
                if (proceso.estado == "W" && proceso.duracion <= 0) {
                    proceso.estado = "E";
                }
            }
        }

        this.tiempo += 1;
        return procesos;
    }

    SJF() {

    }

    SRTF() {

    }

    RR() {

    }
};
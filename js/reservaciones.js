//guardar reservaciones en el dispositivo
var almacen={
    db: null, 
    th: null,
    pr: null,
    ha: null,
    di: null,
    guardarReserva: function(th, pr, ha, di){
        almacen.th = th;
        almacen.pr= pr;
        almacen.ha = ha;
        almacen.di = di;
        
        almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 2000000);
        almacen.db.transaction(almacen.tablaReserva, almacen.error,almacen.confirmarReservaGuardada);
    },
    error: function(err){
        alert(err.code);
    },
    tablaReserva: function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS reservas (id unique, th, pr, ha, di)');
        tx.executeSql("INSERT INTO reservas(th,pr,ha,di) VALUES ('"+almacen.th+"','"+almacen.pr+"','"+almacen.ha+"','"+almacen.di+"')");
    },
    confirmarReservaGuardada: function(){
        alert("Guardado en espera de sicronizacion con el servidor.");
    }
};
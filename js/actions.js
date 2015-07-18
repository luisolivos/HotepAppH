//Funcionalidades principales
//MongoDB base de datos no relacional
var fn = {
    init: function(){
        if(!fn.estaRegistrado())
            window.location.href = "#reg";
        
        $('#reg ul[data-role = listview] a').click(mc.start);
        $("#reg div[data-role = footer] a").tap(fn.registrarClick);
        
        $('#nr1 ul[data-role = listview] a').tap(fn.seleccionarTipo);
        $('#nr1 div[data-role = navbar] li').tap(fn.nr1Siguiente);
        $("#resSend").tap(fn.nr2Send);
    },
    deviceready: function(){
        
        document.addEventListener("deviceready", fn.init, false);
    },
    estaRegistrado: function(){
        if(window.localStorage.getItem("uuid") != undefined)
            return true;
        else
            return false;
    },
    registrarClick: function(){
        $.mobile.loading( "show" );
        var nom = $('#regNom').val();
        var mai = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#fotoTomada').attr("rel");
        
        if(nom != '' && mai != '' && tel != '' && foto != undefined && foto != '')
            fn.enviarRegistro(nom,mai,tel,foto);
        else{
            navigator.notification.alert("Todos los campos son requeridos", null, "Registro", "Aceptar");
            $.mobile.loading( "hide" );
        }
    },
    enviarRegistro: function(nom,mai,tel,foto){
        $.ajax({
            method: "POST",
            url: "http://carlos.igitsoft.com/apps/test.php",
            data: { nom: nom, mail: mai, tel: tel },
            error: function(){
                alert("ajax connection error");
            }
        }).done(function( msg ) {
            if(msg == 1){
                ft.start(foto);//Enviar Foto
            }else{
                navigator.notification.alert("Error al enviar los datos", null, "Enviar Datos", "Aceptar");
            }   
        });
    },
    seleccionarTipo: function(){
        $(this).parents('ul').find('a').css("background-colo","");
        $('#nr1').attr("th", $(this).text());
        $(this).css("background-color","#00aa00");
        },
    nr1Siguiente: function(){
        if($(this).index() == 1 && $('#nr1').attr('th') != undefined)
            window.location.href = "#nr2";
        else{
            alert
            {
                if($(this).index() != 0)
                    alert("Es necesario seleccionar un tipo de habitación");
            }
        }
    },
    nr2Send:function(){
        var th=$("#nr1").attr('th');
        var pr=$("#resPer").val();
        var ha=$("#resHab").val();
        var di=$("#resDia").val();
        
        //Si esta conectado A internet, enviar reserva al servidor
        
        //Si no esta conectado a internet, guardar datos en el dispositivo

       // alet(th + ' - ' + tr + ' - ' + pr + ' - ' + ha + ' - ' + di);
        almacen.guardarReserva(th,pr,ha,di);
    }
    
};

$(fn.deviceready);
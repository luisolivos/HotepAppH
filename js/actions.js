//Funcionalidades principales
var fn = {
    init: function(){
        if(!fn.estaRegistrado())
            window.location.href = "#reg";
        
        $('#reg ul[data-role = listview] a').click(mc.start);
        $("#reg div[data-role = footer] a").click(fn.registrarClick);
    },
    deviceready: function(){
        document.addEventListener("deviceready", fn.init, false);
    },
    estaRegistrado: function(){
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
    }
};

$(fn.deviceready);
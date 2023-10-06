<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="shortcut icon" href="Imagenes/IconoPerfil.png">
        <link rel="stylesheet" type="text/css" href="CSSito/cssPerfil.css" media="screen">
        <link rel="stylesheet" type="text/css" href="CSSito/cssRegresar.css" media="screen">
        <link rel="stylesheet" type="text/css" href="CSSito/cssBotones.css" media="screen">

        <title>Perfil</title>
        
        <script>   
        function cerrarsesion(){
            
            window.location.replace('JSP/Cerrar_Sesion.jsp'); 
            
        }
        </script>
    </head>
    <body>
        <button class="ButtonRegresar" onclick="location.href = 'index.html';">
        </button>
        <div class="contenedorPerfil" style="left:40%;"> 

            <div class="ImagenPerfil" top>
                <img class="avatar" src="Imagenes/logoAlien.png" alt="IconLogo">
            </div>
            <br><br>
            <br><br>
            <br><br>
            <br><br>
            <br><br>
            <br><br>
            <br><br>
            <h2 id="nombreUsuario"> </h2>
        </div>

        <button onclick="if(typeof cerrarsesion === 'function') cerrarsesion()" class="btn1" onclick="" style="top: 5%;
                left: 90%;
                transform: translate(-10%, -10%)">
            Cerrar Sesion
        </button>


        <audio id="Sonido" name="Sonido" loop> 
            <source src="Audio/Perfil.mp3" type="audio/mpeg"></source>
        </audio>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>

            $.ajax({
                url: "JSP/Sesion_Activada.jsp",
                method: "GET",
                success: function (response) {
                    var valor = response.trim();
                    if (valor !== "Sesión no Iniciada") {
                        document.getElementById("nombreUsuario").textContent = "Nombre de Usuario: " + valor;
                    } else {
                        document.getElementById("nombreUsuario").textContent = valor;
                    }
                },
                error: function () {
                    alert("Error al obtener el valor de la variable de Java");
                }
            });

            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "JSP/Var_Tuto.jsp", true);
            xhr1.onreadystatechange = function () {
                if (xhr1.readyState === 4 && xhr1.status === 200) {
                    var response = JSON.parse(xhr1.responseText);
                    var Tut1 = response.T1;
                    var Tut11 = response.It1;
                    var Tut2 = response.T2;
                    var Tut21 = response.It2;
                    var Tut3 = response.T3;
                    var Tut31 = response.It3;
                    console.log(Tut1);
                    console.log(Tut21);
                    console.log(Tut2);
                } else {
                    console.log("Error en la solicitud AJAX");
                }
            };
            xhr1.send();


            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "JSP/Var_Tuto.jsp", true);
            xhr2.onreadystatechange = function () {
                if (xhr2.readyState === 4 && xhr2.status === 200) {
                    var response = JSON.parse(xhr2.responseText);
                    var Tutp21 = response.T2;
                    console.log(Tutp21);
                    if (Tutp21 === "Si") {
                        Swal.fire({
                            title: 'Perfil',
                            text: 'En esta seccion usted podra descubrir su progreso mientras avanza atraves \n\
                            de los distintos niveles que tenemos que ofrecer. Y como usted vera en este momento esta vacios.\n\
                            Asi que porque regresemos y vayamos directamente a los niveles',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#000',
                            background: 'linear-gradient(-45deg, #ffae00, #7e03aa, #00fffb)',
                            color: '#fff',
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            allowEnterKey: true
                        });
                        var Tut2p = "No";
                        $.ajax({
                            url: "JSP/SalTu.jsp",
                            method: "POST",
                            data: {var2p: Tut2p},
                            success: function (response) {
                                console.log(response);
                            },
                            error: function () {
                                alert("Error al enviar la variable al JSP");
                            }
                        });
                    }

                } else {
                    console.log("Error en la solicitud AJAX");
                }
            };
            xhr2.send();

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "JSP/Confi.jsp", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    var musica = response.Music;
                    var Sonidito = document.getElementById("Sonido");
                    console.log(musica);
                    if (musica === "Activado") {
                        Sonidito.play();
                    } else {
                        Sonidito.pause();
                    }
                } else {
                    console.log("Error en la solicitud AJAX");
                }
            };
            xhr.send();

    </script>
</html>

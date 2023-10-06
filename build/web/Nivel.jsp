<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gy-Graph</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="Imagenes/iconoSuperior.png">
        <link rel="stylesheet" href="CSSito/cssNivel.css"/>
        <link rel="stylesheet" href="CSSito/cssRegresar.css" type="text/css"  media="screen">
        <link rel="stylesheet" href="CSSito/cssBotones.css" type="text/css"  media="screen">
        <script src="JS/index.js" type="module" defer></script>
        <script src="JS/palabrasArray.js"></script>
    </head>
    <body>
        <audio id="Sonido" name="Sonido" loop> 
            <source src="Audio/M_Nivel.mp3" type="audio/mpeg"></source>
        </audio>
        <header>

            <button class="ButtonRegresar" onclick="location.href = 'Niveles.html';" style='top:5%; transform: translate(-10%, -10%);'>
            </button>

            <button class="btn4" onclick="location.href = 'Ajustes.html';" style="top: 5%;
                    left: 90%;
                    transform: translate(-10%, -10%)">
                Ajustes
            </button>
            <button class="btn5" onclick="location.href = 'Manual.html';" style="top: 5%;
                    left: 80%;
                    transform: translate(-10%, -10%);">
                Manual
            </button>
        </header>
        <div class="finisher-header" style="width: 100%; height: 100vh;" >
            <input type="text">
            <div id="palabraActual"></div>
            <button id="empezar">Empezar</button>
            <!--id="formularioPuntaje"-->
            <!--action="Puntaje.jsp"-->
            <form  id="formularioPuntaje"> 
                <div class="escondido" id="final">
                    <p class="data" id="infoNivel" name="infoNivel"> <span><input type="text" name="spanInfoNivel" id="spanInfoNivel" value="0"></span></p>
                    <p class="data" id="nomUsu"> <span id="nombreUsuario"><input type="text" name="nombreUsuario" id="nombreUsuario"></span></p>
                    <p class="data" id="correctas">Letras correctas: <span> <input type="text" name="spanCorrectas" id="spanCorrectas" value="0">0</span></p>
                    <p class="data" id="incorrectas">Errores: <span> <input type="text" name="spanErrores" id="spanErrores" value="0">0</span></p>
                    <p class="data" id="ppm" name="Palabras por minuto">PPM: <span><input type="text" name="spanPPM" id="spanPPM" value="0">0</span></p>
                    <h1><p class="data" id="Puntaje" name="Puntaje">Puntaje: <span><input type="text" name="spanPuntaje" id="spanPuntaje" value="0">0</span></p></h1>
                    <p class="data" id="PuntajeMin" name="PuntajeMin">Puntaje Minimo: <span><input type="text" name="spanPuntajeMin" id="spanPuntajeMin" value="0">0</span></p>

                    <!--<input type="hidden" id="bntGuardarPuntaje">-->
                    <button>Reiniciar</button>
                </div>
            </form>

            <div id="barraProgreso">
                <div></div>
            </div>

        </div>


        <script src="JS/finisher-header.es5.min.js" type="text/javascript"></script>

    </body>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
                $(document).ready(function () {
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
                });
    </script>
    <script type="text/javascript">
        new FinisherHeader({
            "count": 100,
            "size": {
                "min": 2,
                "max": 8,
                "pulse": 0
            },
            "speed": {
                "x": {
                    "min": 0,
                    "max": 0.4
                },
                "y": {
                    "min": 0,
                    "max": 0.6
                }
            },
            "colors": {
                "background": "#201e30",
                "particles": [
                    "#fbfcca",
                    "#d7f3fe",
                    "#ffd0a7"
                ]
            },
            "blending": "overlay",
            "opacity": {
                "center": 1,
                "edge": 0
            },
            "skew": 0,
            "shapes": [
                "c"
            ]
        });
    </script>
</html>

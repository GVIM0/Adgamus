<%@page import="java.sql.*, clasesita.conectadita" %>F
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Form Login | Gy-Graph</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="Imagenes/iconoSuperior.png">
        <link rel="stylesheet" type="text/css" href="CSSito/cssLogin.css">
        <link rel="stylesheet" type="text/css" href="CSSito/cssRegresar.css">
    </head>
    <body>

        <button class="ButtonRegresar" onclick="location.href = 'index.html';">

        </button>
        <div class="login-box">
            <img class="avatar" src="Imagenes/logoAlien.png" alt="IconLogo">
            <h1>Inicio de sesión</h1>
            <form action="">

                <label for="password">Usuario
                    <span class="icon">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                </label> 

                <input type="text" id="Nombre" name="Nombre" placeholder="Ingresar usuario" required>

                <label for="password">Contraseña
                    <span class="icon">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>

                </label>

                <input type="password" id="Contrasenia" name="Contrasenia" placeholder="Ingresar contraseña" required>

                <input type="submit" id="Inic_Ses" name="Inic_Ses" src="Imagenes/fondoBoton.jpg" value="Iniciar sesión">

                <a href="#">¿Olvidaste tu constraseña?</a><br>
                <a href="Register.html">¿No tienes una cuenta? Registrarse</a>
            </form>
        </div>

        <%
            if (request.getParameter("Inic_Ses") != null) {
                String contraa = request.getParameter("Contrasenia");
                String nombree = request.getParameter("Nombre");
                HttpSession sesion = request.getSession();

                Connection con = null;
                CallableStatement callable = null;
                conectadita conecta = new conectadita();
                con = conecta.conectar();

                if (!contraa.isEmpty() && !nombree.isEmpty()) {
                    String querystring = "call buscar (?,?)";
                    callable = con.prepareCall(querystring);
                    callable.setString(1, contraa);
                    callable.setString(2, nombree);
                    ResultSet rs = callable.executeQuery();

                    if (rs.next()) {
                        out.print("<script> alert('Usuario Encontrado con Éxito'); </script>");
                        sesion.setAttribute("usuario", nombree);
                    } else {
                        out.print("<script> alert('Usuario no registrado'); </script>");
                        sesion.setAttribute("No_Found", "No");
                        response.sendRedirect("http://localhost:8080/Mecanomania/");
                    }
                    con.close();
                    callable.close();
                } else {
                    out.print("<script> alert('No relleno los campos'); </script>");
                }
            }
        %>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <audio id="Sonido" name="Sonido" loop> 
            <source src="Audio/M_Lobby.mp3" type="audio/mpeg"></source>
        </audio>
    </body>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>

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


            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "JSP/Var_Tuto.jsp", true);
            xhr2.onreadystatechange = function () {
                if (xhr2.readyState === 4 && xhr2.status === 200) {
                    var response = JSON.parse(xhr2.responseText);
                    var Tut1 = response.T1;
                    var Tutl1 = response.Itl1;
                    var Tut2 = response.T2;
                    console.log(Tut1);
                    console.log(Tutl1);
                    if (Tut1 === "Si") {
                        Swal.fire({
                            title: 'Bienvenida',
                            html: '<div style="text-align: center;">\n\
                            En este Apartado usted podra logearse, si es que ya tiene una cuenta.<br> \n\
                            En caso contrario porfavor presione donde dice "¿No tienes una cuenta? Registrarse"</div>',
                            icon: 'info',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#000',
                            background: 'linear-gradient(-45deg, #7e03aa, #0033ff, #8000ff)',
                            color: '#fff',
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            allowEnterKey: true
                        });


                        var Tutl1 = "No";
                        $.ajax({
                            url: "JSP/SalTu.jsp",
                            method: "POST",
                            data: {varTL: Tutl1},
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



    </script>
</html>
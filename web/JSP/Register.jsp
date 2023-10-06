<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@page import="clasesita.Parametros"%>
        <title>JSP Page</title>

        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="JS/sweetalert2.min.js"></script>
        <link rel="stylesheet" href="CSSito/sweetalert2.min.css">
        <script src="JS/jsAlert.js"></script>

        <script>
            function mensaje() {
                alert("Listo para la acción");
            }
            function mensaje2() {
                alert("Ingrese datos correctamente");
            }
            function myFunction() {
                let text = "Press a button!\nEither OK or Cancel.";
                if (confirm(text) === true) {

                } else {
                    text = "You canceled!";
                }
            }

        </script>
    </head>
    <body>
        <%@page import="java.sql.*, clasesita.conectadita" %>
        <%
            HttpSession sesion = request.getSession();
            String Ent_Regis = "SI";
            String In_Tut1 = "No";
            String In_Tut2 = "Si";
   
            sesion.setAttribute("Entro_Registro", Ent_Regis);

            String contraa = request.getParameter("contrasenia");
            String nombree = request.getParameter("nombre");
            String confirm = request.getParameter("confirmcontra");
            Connection con = null;
            CallableStatement callable = null;
            conectadita conecta = new conectadita();
            con = conecta.conectar();

            if (contraa.equals(confirm) && !contraa.isEmpty() && !nombree.isEmpty() && !confirm.isEmpty()) {
                String querystring1 = "call buscar (?,?)";
                callable = con.prepareCall(querystring1);
                callable.setString(1, contraa);
                callable.setString(2, nombree);
                ResultSet rs = callable.executeQuery();

                if (rs.next()) {
                    String Enc = "si";
                    sesion.setAttribute("Encontrado", Enc);
                    out.print("<script>window.location.replace('http://localhost:8080/Mecanomania/'); </script>");
                    con.close();
                    callable.close();
                } else {
                    String querystring = "call agregar (?,?,?)";
                    callable = con.prepareCall(querystring);
                    callable.setInt(1, 0);
                    callable.setString(2, nombree);
                    callable.setString(3, contraa);
                    callable.executeUpdate();
                    con.close();
                    callable.close();
                    String Enc = "No";
                    sesion.setAttribute("usuario", nombree);
                    sesion.setAttribute("Encontrado", Enc);
                    out.print("<script>window.location.replace('http://localhost:8080/Mecanomania/');</script>");
                }
            } else {
                out.print("<script>mensaje2();</script>");
            }

        %>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="JS/sweetalert2.min.js"></script>
        <link rel="stylesheet" href="CSSito/sweetalert2.min.css">
        <script src="JS/jsAlert.js"></script>
    </body>
</html>
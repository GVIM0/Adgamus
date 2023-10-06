<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%
    HttpSession sesion = request.getSession();
    String nombreUsuario = "";
    String Niv3 = "No";
    String Tuto1 = "No";
    String Tuto2 = "Si";
//    if(){
    if (sesion.getAttribute("usuario") != null) {
        nombreUsuario = (String) sesion.getAttribute("usuario");
        sesion.setAttribute("Entro_Registro", Niv3);
        sesion.setAttribute("Index_Tutorial1", Tuto1);
        sesion.setAttribute("Index_Tutorial2", Tuto2);
    } else {
        nombreUsuario = "Sesión no Iniciada";
    }
//    }
    out.print(nombreUsuario);
%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="org.json.JSONObject" %>

<%
    HttpSession sesion = request.getSession();

    String Tip_Tec = request.getParameter("TipoTeclado");
    String Tip_Idi = request.getParameter("TipoIdioma");
    String Mus = request.getParameter("Musica");
    String Vis_Ajus = "Si";
    sesion.setAttribute("Visito_Ajustes", Vis_Ajus);

    sesion.setAttribute("Tipo_Tecla", Tip_Tec);
    sesion.setAttribute("Tipo_Idio", Tip_Idi);
    if (Mus == null) {
        Mus = "Desactivado";
        sesion.setAttribute("Musica", Mus);
    } else {
        Mus = "Activado";
        sesion.setAttribute("Musica", Mus);
    }

    out.print("<script>window.location.replace('http://localhost:8080/Mecanomania/'); </script>");

%>

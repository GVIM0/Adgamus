
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="clasesita.Parametros"%>
<%
    HttpSession sesion = request.getSession();
    String Vis = "";

    if (sesion.getAttribute("Visito_Ajustes") == "Si") {
        Vis = (String) sesion.getAttribute("Visito_Ajustes");
    } else {
        Vis = "NO";
    }
    sesion.setAttribute("Entro_Registro", "No");
    out.print(Vis);

%>

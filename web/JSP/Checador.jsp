
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="clasesita.Parametros"%>
<%
    HttpSession sesion = request.getSession();
    String Niv2 = "";
    
        if (sesion.getAttribute("Entro_Registro") == "SI") {
         Niv2 = (String) sesion.getAttribute("Entro_Registro");
    } else {
         Niv2 = "NO";
    }
    
    out.print(Niv2);

%>

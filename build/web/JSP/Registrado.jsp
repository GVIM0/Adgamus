
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="clasesita.Parametros"%>
<%
    HttpSession sesion = request.getSession();
    String AG1 = "";
    
    if (sesion.getAttribute("Again") == "Ya") {
         AG1 = "Ya";
    } else {
         AG1 = "NO";
    }
    
    out.print(AG1);

%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="org.json.JSONObject" %>
<%
    HttpSession sesion = request.getSession();
    String Bien2 = "No";
    sesion.setAttribute("Bienvenida", Bien2);

    out.print(Bien2);

%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="org.json.JSONObject" %>
<%
    HttpSession sesion = request.getSession();
    String Tip_Tec = (String) sesion.getAttribute("Tipo_Tecla");
    String Tip_Idi = (String) sesion.getAttribute("Tipo_Idio");
    String Mus = (String) sesion.getAttribute("Musica");

        JSONObject respuesta = new JSONObject();
        respuesta.put("Tip_T", Tip_Tec);
        respuesta.put("Tip_I", Tip_Idi);
        respuesta.put("Music", Mus);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        out.print(respuesta.toString());

%>
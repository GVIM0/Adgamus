<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="org.json.JSONObject" %>
<%
    HttpSession sesion = request.getSession();
    String Tuto1 = (String) sesion.getAttribute("Index_Tutorial1");
    String Tuto11 = (String) sesion.getAttribute("It1");
    String TutoLo1 = (String) sesion.getAttribute("Itl1");
    String Tutore1 = (String) sesion.getAttribute("Itr1");
    String Tuto2 = (String) sesion.getAttribute("Index_Tutorial2");
    String Tuto21 = (String) sesion.getAttribute("It2");
    String Tuto22 = (String) sesion.getAttribute("Itp2");
    String Tuto23 = (String) sesion.getAttribute("Itp22");
    String Tuto3 = (String) sesion.getAttribute("Index_Tutorial3");
    String Tuto31 = (String) sesion.getAttribute("It3");

    if (Tuto1 == null && Tuto2 == null && Tuto3 == null) {

        Tuto1 = "Si";
        Tuto11 = "Si";
        TutoLo1 = "Si";
        Tutore1 = "Si";
        Tuto2 = "No";
        Tuto21 = "Si";
        Tuto3 = "No";
        Tuto31 = "Si";
        sesion.setAttribute("Index_Tutorial1", Tuto1);
        sesion.setAttribute("It1", Tuto11);
        sesion.setAttribute("Itl1", TutoLo1);
        sesion.setAttribute("Itr1", Tutore1);
        sesion.setAttribute("Index_Tutorial2", Tuto2);
        sesion.setAttribute("It2", Tuto21);
        sesion.setAttribute("Index_Tutorial3", Tuto3);
        sesion.setAttribute("It3", Tuto1);

    } else {
     if( Tuto2 == "Si"){
        Tuto2 = "Si";
        Tuto21 = "Si";
        Tuto22 = "Si";
        Tuto23 = "Si";
  
        sesion.setAttribute("Index_Tutorial2", Tuto2);
        sesion.setAttribute("It2", Tuto21);
        sesion.setAttribute("Itp2", Tuto22);
        sesion.setAttribute("Itp22", Tuto23);

    }
    }

    JSONObject respuesta = new JSONObject();
    respuesta.put("T1", Tuto1);
    respuesta.put("It1", Tuto11);
    respuesta.put("Itl1", TutoLo1);
    respuesta.put("Itr1", Tutore1);
    respuesta.put("T2", Tuto2);
    respuesta.put("It2", Tuto21);
    respuesta.put("Itp2", Tuto22);
    respuesta.put("Itp22", Tuto23);
    respuesta.put("T3", Tuto3);
    respuesta.put("It3", Tuto31);

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    out.print(respuesta.toString());

%>
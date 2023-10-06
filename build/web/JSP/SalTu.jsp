<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="org.json.JSONObject" %>
<%
    HttpSession sesion = request.getSession();

    String Tuto1 = "No";
    String Tuto2 = "No";
    String VarT1 = request.getParameter("varT");
    String VarTL1 = request.getParameter("varTL");
    String VarTR1 = request.getParameter("varTR");
    String VarT2 = request.getParameter("varT2");
    String VarP2 = request.getParameter("var2p:");
    String VarT3 = request.getParameter("varT3");

    sesion.setAttribute("It1", VarT1);
    sesion.setAttribute("Itl1", VarTL1);
    sesion.setAttribute("Itr1", VarTR1);
    sesion.setAttribute("It2", VarT2);
    sesion.setAttribute("Itp2", VarP2);
    sesion.setAttribute("It3", VarT3);

   


%>

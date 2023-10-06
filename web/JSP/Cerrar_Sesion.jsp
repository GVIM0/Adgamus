<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%
    HttpSession sesion = request.getSession();
    
    String ses = null;
    
        sesion.setAttribute("usuario", ses);
         response.sendRedirect("http://localhost:8080/Mecanomania/");
%>

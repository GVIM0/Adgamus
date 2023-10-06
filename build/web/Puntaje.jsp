<%-- 
    Document   : Puntaje.jsp
    Created on : 28 may. 2023, 00:42:20
    Author     : compu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
    String nombreUsuarioo = request.getParameter("nombreUsuario");
    String spanCorrectass = request.getParameter("spanCorrectas");
    String spanErorress = request.getParameter("spanErrores");
    String spanPPMM = request.getParameter("spanPPM");

    out.print("<script>console.log('" + nombreUsuarioo + "');");
    out.print("console.log('" + spanCorrectass + "');");
    out.print("console.log('" + spanErorress + "');");
    out.print("alert('aaaaaaaaaa');");
    out.print("console.log('" + spanPPMM + "');</script>");
    out.print(nombreUsuarioo);
    out.print(spanCorrectass);
    request.getRequestDispatcher("Nivel.jsp").forward(request, response);


%>


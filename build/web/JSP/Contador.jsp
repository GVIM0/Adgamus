
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="clasesita.Parametros"%>
<%
    Parametros para = new Parametros();
    
    int Niv= para.getNiv();
    
    para.setNiv(Niv+1); 

    int Niv2 = para.getNiv();
    
    out.print(Niv2);

%>

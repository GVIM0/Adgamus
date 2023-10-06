package clasesita;

import static java.lang.System.out;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class conectadita {
    Connection MecanoCon = null;
    
    public Connection conectar(){
        try{
        Class.forName("com.mysql.cj.jdbc.Driver");
        MecanoCon = DriverManager.getConnection("jdbc:mysql://localhost:3308/mecanomania?autoReconnect=true&useSSL=false", "root", "n0m3l0");
        
        }catch(SQLException | ClassNotFoundException error){
            out.println(error.toString());
        }
        return MecanoCon;
    }
    
    
}

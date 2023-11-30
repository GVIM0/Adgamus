const express = require("express");
const { engine } = require("express-handlebars");
const myconnection = require("express-myconnection");
const mysql = require("mysql2");
const session = require("express-session");
const bodyParser = require("body-parser");
const handlebars = require('handlebars');


const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const generalRoutes = require("./routes/navigation");


const app = express();
app.set("port", 4000);

app.set("views", __dirname + "/views");
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);

app.use(express.static("src"));

app.set("view engine", "hbs");

//app.use(express.static(__dirname + "/src"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "n0m3l0",
  port: "3306",
  database: "Adgamus",
};

const connection = mysql.createConnection(dbConfig);

// Manejadores de eventos para la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos exitosa");
});

connection.on("error", (err) => {
  console.error("Error en la conexión a la base de datos:", err);
  // Puedes manejar el error según tus necesidades
});

// Configuración del middleware de conexión
app.use(myconnection(mysql, dbConfig));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.listen(app.get("port"), () => {
  console.log("Listening on port", app.get("port"));
});

app.use("/", loginRoutes);
app.use("/", adminRoutes);
app.use("/", generalRoutes);

app.get("/", (req, res) => {
  if (req.session.loggedin == true) {
    if (req.session.admin == 1) {
      res.render("admin/admin", {
        name: req.session.name,
        admin: req.session.admin,
      });
    } else {
      res.render("home", { name: req.session.name, admin: req.session.admin });
    }
  } else {
    res.redirect("login");
  }
});

//Helpers
handlebars.registerHelper('eq', function (expected, actual) {
  return expected === actual;
});

handlebars.registerHelper('json-stringify', function (context) {
  return JSON.stringify(context);
});

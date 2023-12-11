const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("guimo/empresa", { layout: false });  // Renderiza la página de inicio independiente
});

router.get("/acerca", (req, res) => {
  res.render("guimo/Acerca_de", { layout: false });  // Renderiza la página de inicio independiente
});

router.get("/blog", (req, res) => {
  res.render("guimo/blog", { layout: false });  // Renderiza la página de inicio independiente
});

router.get("/contacto", (req, res) => {
  res.render("guimo/Contacto", { layout: false });  // Renderiza la página de inicio independiente
});

router.get("/precios", (req, res) => {
  res.render("guimo/Precios", { layout: false });  // Renderiza la página de inicio independiente
});

router.get("/servicios", (req, res) => {
  res.render("guimo/Servicios", { layout: false });  // Renderiza la página de inicio independiente
});

//   router.get("/login", (req, res) => {
//     res.render("login/index", { layout: false });  // Renderiza la página de inicio independiente
//   });


module.exports = router;

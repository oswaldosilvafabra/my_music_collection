const express = require("express");
const app = express();
const { player } = require("./Player");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//Pagina principal
app.get("/", function(req, res) {
  res.send("My music collection v1.0");
});

//Traer todos los usuarios
app.get("/users", function(req, res) {
  player.getUsers(res);
});

//Agregar un usuario
app.post("/users", function(req, res) {
  let { user } = req.body;
  player.setUser(user, res);
});

//Traer un usuario por su id
app.get("/users/:id", function(req, res) {
  let { id } = req.params;
  player.getUser(id, res);
});

//Agregar una lista de usuario
app.post("/users/:user_id/lists", (req, res) => {
  let { user_id } = req.params;
  let { list } = req.body;
  player.setUserList(user_id, list, res);
});

//Traer las listas de un usuario
app.get("/users/:id/lists", function(req, res) {
  let { id } = req.params;
  player.getUserLists(id, res);
});

//Traer una lista específica de un usuario
app.get("/users/:user_id/lists/:list_id", (req, res) => {
  let { user_id, list_id } = req.params;
  player.getUserList(user_id, list_id, res);
});

//Agregar un artista
app.post("/artists/", (req, res) => {
  let { artist } = req.body;
  player.setArtist(artist, res);
});

app.get("/artists/", (req, res) => {
  player.geArtists(res);
});

app.get("/artists/:id", (req, res) => {
  let { id } = req.params;
  player.geArtist(id, res);
});

exports.app = app;

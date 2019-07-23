//requerimos las biblotecas express para las rutas, bodyParser para loenvios por post de JSON
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//llamamos el controlador que se encarga de gestionar la base de datos
const controller = require("./Controller");

//creamos la ruta raiz para enviar un mensaje de bienvenida con la version
app.get("/", (req, resp)=>{
    //retornamos un mensaje
    res.send("My Music v1")
})
//creamos la ruta users que deberá traer todos los usuarios
app.get("/users", (req, resp)=>{
    //llamamos el metodo getUser del objeto controller, este se encarga de buscar todos los usuarios
    //recibe por parametros req que es igual a la consulta request(consulta) y el res que equivale al response(respuesta)
    controller.getUsers(req, resp);
})

//Traer un usuario por su id
app.get("/users/:id", function(req, res) {
  let { id } = req.params;
  controller.getUser(id, res);
});

//Agregar un usuario
app.post("/users", function(req, res) {
  let { user } = req.body;
  controller.setUser(user, res);
});

//Agregar una lista de usuario
app.post("/users/:user_id/lists", (req, res) => {
  let { user_id } = req.params;
  let { list } = req.body;
  controller.setUserList(user_id, list, res);
});

//Traer las listas de un usuario
app.get("/users/:id/lists", function(req, res) {
  let { id } = req.params;
  controller.getUserLists(id, res);
});

//Traer una lista específica de un usuario
app.get("/users/:user_id/lists/:list_id", (req, res) => {
  let { user_id, list_id } = req.params;
  controller.getUserList(user_id, list_id, res);
});

//Agregar un artista
app.post("/artists/", (req, res) => {
  let { artist } = req.body;
  controller.setArtist(artist, res);
});

// Traer todos los artistas
app.get("/artists/", (req, res) => {
  controller.getArtists(res);
});

//traer un artista por su id
app.get("/artists/:id", (req, res) => {
  let { id } = req.params;
  controller.getArtist(id, res);
});

//Guardar una cancion
app.post("/songs", (req, res) => {
  let { song } = req.body;
  controller.setSong(song, res);
});

//traer todas las canciones
app.get("/songs", (req, res) => {
  controller.getSongs(res);
});

//traer una cancion
app.get("/songs/:id", (req, res) => {
  let { id } = req.params;
  controller.getSong(id, res);
});

//exportamos la constante app con toda la configuracion de las rutas
exports.app = app
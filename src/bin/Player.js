const { database } = require("./Database");
const User = require("./models/User");
const List = require("./models/List");
const Artist = require("./models/Artist");

class Player {
  constructor() {
    database.connect();
  }

  //Traer todos los usuarios
  getUsers(res) {
    User.find({}, (err, users) => {
      res.send({ status: 200, users: users });
    });
  }

  //Agregar un usuario
  setUser(user, res) {
    User.create(user, function(err, newUser) {
      if (err) throw err;
      res.send({ status: 200 });
    });
  }

  //Traer un usuario por su id
  getUser(id, res) {
    User.find({ _id: id }, (err, user) => {
      res.send({ status: 200, user: user });
    });
  }

  //Agregar una lista de usuario
  setUserList(user_id, list, res) {
    list.user_id = user_id;
    List.create(list, function(err, newList) {
      if (err) return handleError(err);
      res.send({ status: 200, id_list: newList._id });
    });
  }

  //Traer todas las listas de un usuario
  getUserLists(id, res) {
    List.find({ user_id: id }, function(err, userList) {
      if (err) throw err;
      res.send({ status: 200, user_list: userList });
    });
  }

  //Traer todas una lista de usuario con sus respectivas canciones
  getUserList(user_id, list_id, res) {
    List.find({ _id: list_id })
      //.populate({ path: "song_id", select: "name" })
      .exec(function(err, userListSong) {
        if (err) throw err;
        res.send({ status: 200, user_list_song: userListSong });
      });
  }

  //Guardar un artista
  setArtist(artist, res) {
    Artist.create(artist, function(err, newArtist) {
      if (err) return handleError(err);
      res.send({ status: 200, id_artist: newArtist._id });
    });
  }

  //traer todos los artistas
  geArtists(res) {
    Artist.find().exec(function(err, artist) {
      if (err) throw err;
      res.send({ status: 200, artists: artist });
    });
  }

  geArtist(id, res) {
    Artist.find({ _id: id }).exec(function(err, artist) {
      if (err) throw err;
      res.send({ status: 200, artists: artist });
    });
  }

  setSong() {}
}

exports.player = new Player();

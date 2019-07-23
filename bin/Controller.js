const mongoose = require("mongoose");
const  User  = require("./models/User");

class Controller{

    constructor(){
        //al crearse el objeto se establece la conexion
        this.connect();
    }

    async connect(){
       try {
        //se intenta establecer una conexion con los datos de conexion
         await mongoose.connect(
                    "mongodb+srv://kikret:7x7e9l1a@cluster0-9ek42.mongodb.net/myMusicDB?retryWrites=true",
                    { useNewUrlParser: true }
                );
            //en caso de esablecer la conexion, se muestra en consola este mensaje
            console.log("Connected databases.");
        } catch (e) {
            //en caso de haber un error se muestra en consola el error
            console.error(e);
        }
    }
    //metodo para buscar todos los usuarios
    getUsers(){
        //en el modelo User se ejecuta el find sin ninguna condicion...
        User.find({}, (err, users)=>{
            //en caso de haberse presentado un error se ejecuta el error
            if(err) throw err;
            //de lo contrario se retorna un objeto con todos los resultados
            res.send( { allUsers : users } );
        })
    }

    getUser(id, res){
        //en el modelo User se ejecuta el find sin ninguna condicion...
        User.find({id:_id}, (err, users)=>{
            //en caso de haberse presentado un error se ejecuta el error
            if(err) throw err;
            //de lo contrario se retorna un objeto con todos los resultados
            res.send( { allUsers : users } );
        })
    }

    setUser(user, res){
        User.create(user, function(err, newUser) {
            if (err) throw err;
                res.send({ status: 200 , nU: newUser});
        });
    }

    setUserList(user_id, list, res){
        list.user_id = user_id;
        List.create(list, function(err, newList) {
            if (err) return handleError(err);
            res.send({ status: 200, id_list: newList._id });
        });
    }

    getUserLists(id, res){
        List.find({ user_id: id }, function(err, userList) {
            if (err) throw err;
            res.send({ status: 200, user_list: userList });
        });
    }

    getUserList(user_id, list_id, res){
        List.find({ _id: list_id, user_id: user_id })
        .populate({ path: "song_id", select: "name" })
        .exec(function(err, userListSong) {
            if (err) throw err;
            res.send({ status: 200, user_list_song: userListSong });
        });
    }

    setArtist(artist, res){
        Artist.create(artist, function(err, newArtist) {
            if (err) throw(err);
            res.send({ status: 200, id_artist: newArtist._id });
        });
    }

    getArtists(res){
        Artist.find().exec(function(err, artist) {
            if (err) throw err;
            res.send({ status: 200, artists: artist });
        });
    }

    getArtist(id, res) {
        Artist.find({ _id: id }).exec(function(err, artist) {
            if (err) throw err;
            res.send({ status: 200, artists: artist });
        });
    }

    setSong(song, res) {
        Song.create(song, function(err, newSong) {
            if (err) throw(err);
            res.send({ status: 200, id_song: newSong._id });
        });
    }
    getSongs(res) {
        Song.find({ _id: id }).exec(function(err, songs) {
            if (err) throw err;
            res.send({ status: 200, artists: songs });
        });
    }
    getSong(id, res) {
        Song.find({ _id: id }).exec(function(err, song) {
            if (err) throw err;
            res.send({ status: 200, artists: song });
        });
    }
}
// se exporta elobjeto controlador crado a partir de la clase Controller
exports.controller = new Controller();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name1: String,
  name2: String,
  last_name1: String,
  last_name2: String,
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song"
    }
  ]
});

var Song = mongoose.model("Song", SongSchema);
module.exports = Song;

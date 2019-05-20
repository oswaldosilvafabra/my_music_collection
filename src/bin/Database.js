var mongoose = require("mongoose");
class Database {
  constructor() {}

  async connect() {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017/my_music_collection_db",
        { useNewUrlParser: true }
      );
      console.log("Connected databases.");
    } catch (e) {
      console.error(e);
    }
  }
}

exports.database = new Database();

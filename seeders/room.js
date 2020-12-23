const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "../app/config/config.env" });

const room = require("../app/model/room.model");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const rooms = JSON.parse(
  fs.readFileSync(`..\\_data\\rooms.json`, `utf-8`)
);

//import into db
const importData = async () => {
  try {
    await room.create(rooms);
    console.log("Data Imported....".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);}
};



//delete data from db
const deleteData = async () => {
    try {
      await room.deleteMany();
      console.log("Data Deleted....".red.inverse);
      process.exit();
    } catch (err) {
        console.log(err);
    }
  };
  

if(process.argv[2]==='-i'){
    importData();

}else if(process.argv[2]==='-d'){
    deleteData()
}
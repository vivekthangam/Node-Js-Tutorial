const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "../app/config/config.env" });

const message = require("../app/model/message.model");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const messages = JSON.parse(
  fs.readFileSync(`..\\_data\\messages.json`, `utf-8`)
);

//import into db
const importData = async () => {
  try {
    await message.create(messages);
    console.log("Data Imported....".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);}
};



//delete data from db
const deleteData = async () => {
    try {
      await message.deleteMany();
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
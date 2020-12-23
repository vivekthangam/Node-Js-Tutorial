const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "../app/config/config.env" });

const friendList = require("../app/model/friendList.model");

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const friendLists = JSON.parse(
    fs.readFileSync(`..\\_data\\friendLists.json`, `utf-8`)
);

//import into db
const importData = async() => {
    try {
        await friendList.create(friendLists);
        console.log("Data Imported....".green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
};



//delete data from db
const deleteData = async() => {
    try {
        await friendList.deleteMany();
        console.log("Data Deleted....".red.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
};


if (process.argv[2] === '-i') {
    importData();

} else if (process.argv[2] === '-d') {
    deleteData()
}
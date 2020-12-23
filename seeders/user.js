const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "../app/config/config.env" });

const user = require("../app/model/user.model");
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const users = JSON.parse(
    fs.readFileSync(`${__dirname}\\_data\\users.json`, `utf-8`)
);

//import into db
const importData = async() => {
    try {
        await user.create(users);
        console.log("Data Imported....".green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
};



//delete data from db
const deleteData = async() => {
    try {
        await user.deleteMany();
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
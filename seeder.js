const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./app/config/config.env" });

const Todo = require("./app/model/todo.model");

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const ToDos = JSON.parse(
    fs.readFileSync(`${__dirname}\\_data\\Todos.json`, `utf-8`)
);

//import into db
const importData = async() => {
    try {
        console.log("running")
        await Todo.create(ToDos);
        console.log("Data Imported....".green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
};



//delete data from db
const deleteData = async() => {
    try {
        await Todo.deleteMany();
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
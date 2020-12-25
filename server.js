const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var cookieParser = require('cookie-parser');
//file upload
const multer = require("multer");
const uuid = require("uuid").v4;
const fileUpload = require('express-fileupload');
const upload = multer({ dest: 'uploads/' })

//Socket io 
// const server = require('http').createServer()


//Load env vars
dotenv.config({ path: "./app/config/config.env" });
const route = require("./app/routes/todo.routes");
const router = require("./app/routes/todo.routes");
const logger = require("./app/middeware/logger");
const Mongodb = require("./app/config/db.config")
const errorhandler = require("./app/middeware/error")
const createRoutes = require("./app/routes/index")
var path = require('path');



//creating express server
const app = express();
//Cookie Parser
app.use(cookieParser());
app.use(express.static('./app/views'));


//File Upload Middleware
app.use(fileUpload());

app.use(express.json());


app.use(cors());


Mongodb();
//routes
app.get("/", (req, res) => {
    res.status(200).json({
        sucess: false,
        data: {
            id: 1,
            name: __dirname,
        },
    });
});



app.post("/upload", upload.single("avatar"), (req, res) => {
    // console.log(req)
    res.status(200).json({
        sucess: false,
        data: {
            id: 1,
            name: __dirname,
        },
    });
});
// viewed at http://localhost:8080
app.get('/home', function(req, res) {
    console.log(path.join(__dirname + '//home.html'))
    res.sendFile(path.join(__dirname + '//app//views//home.html'));
    //  res.send("t")
});

app.listen(8080);

app.use(logger)
    // app.use("/api/v1/todos",router)
createRoutes(app);
//error Handler
app.use(errorhandler)
const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () =>
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

const io = require('socket.io')(server)


io.on('connection', function(client) {

    console.log('client connect...', client.id);
    io.on("send_message", (data) => {
        io.broadcast.emit("receive_message", data)
    })
    client.on('typing', function name(data) {
        console.log(data);
        io.emit('typing', data)
    })

    client.on('message', function name(data) {
        console.log(data);
        io.emit('message', data)
    })

    client.on('location', function name(data) {
        console.log(data);
        io.emit('location', data);
    })

    client.on('connect', function() {})

    client.on('disconnect', function() {
        console.log('client disconnect...', client.id)
            // handleDisconnect()
    })

    client.on('error', function(err) {
        console.log('received error from client:', client.id)
        console.log(err)
    })
})

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`);
    //close server & exit process
    server.close(() => process.exit(1))
})
const express = require("express");
const dotenv = require("dotenv")

//Load env vars
dotenv.config({ path: './app/config/config.env' })

//creating express server
const app = express();

const PORT = process.env.PORT || 5500
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
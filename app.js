const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandlingMiddleWare");
// const cors = require("cors");
const app = express();

// console.log(cors);
const PORT = config.get("port");
const routes = require("./routes/index.routes");

app.use(express.json());
app.use(cookieParser());
// app.use(cors);

app.use(routes);
app.use(errorHandler);

async function start() {
    try {
        await mongoose.connect(config.get("dbAdr"));
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portda ishga tushdi`);
        });
    } catch (error) {
        consolge.log("Serverda hatolik", error.message);
    }
}

start();


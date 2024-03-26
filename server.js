const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const router = require("./router/app");

const PORT = 5050;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.set("view engine", "ejs");

app.use(router);

app.get("/", (req, res)=>{
    res.render("main")
})

app.listen(PORT, ()=> {
    console.log(`Sunucu ${PORT}' aktif!`);
})
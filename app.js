const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "ejs");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];



// GET/POST METHODS FOR HOMEPAGE && POST FOR WORK PAGE
app.get("/", function(req, res) {
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", function(req, res) {
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
})



// GET METHOD FOR WORKPAGE
app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})



// SETTING UP PORT 3000 FOR SERVER
app.listen(3000, function() {
    console.log("Server running on port 3000!");
})
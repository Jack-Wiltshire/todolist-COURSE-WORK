const express = require("express");
const bodyParser = require("body-parser");
const getDate = require(__dirname + "/date.js");
const app = express();

const toDoItems = [];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    const day = getDate.getDate();
    res.render("list", { listTitle: day, newToDoItems: toDoItems });
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newToDoItems: workItems });
});

app.get("/about", function (req, res) {
    res.render("about");
})

app.post("/", function (req, res) {

    const toDoItem = req.body.ToDoItem;

    if (req.body.list === "Work") {
        workItems.push(toDoItem);
        res.redirect("/work");
    } else {
        toDoItems.push(toDoItem);
        res.redirect("/");
    };
});

app.listen(3000, function () {
    console.log("Server running on Port 3000.");
});
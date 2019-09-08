var express = require("express");
var app = express();
var fake = require("faker");
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
var friendList = [];

app.get("/", (req, res) => {
    generateData();
    res.render("home");
});

app.get("/friends", (req, res) => {
    res.render("listFriend", {
        friendList: friendList
    });
});

app.get("/addfriend", (req, res) => {
    res.render("addFriend")
});

app.post("/addaFriend", (req, res) => {
    console.log(req.body);
    var newFriend = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state
    }
    friendList.push(newFriend);
    res.redirect("/friends");
});



const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);


function generateData() {
    for (var i = 0; i < 10; i++) {
        var friend = {
            firstName: fake.name.firstName(),
            lastName: fake.name.lastName(),
            streetAddress: fake.address.streetAddress(),
            city: fake.address.city(),
            state: fake.address.state()
        }
        friendList.push(friend);
    }
}
const express = require("express");
const rp = require("request-promise");
const fake = require("faker");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
var friendList = [];
var movieList = [];



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

app.get("/listmovies", (req, res) => {
  res.render("movieList", {movieList:movieList});
});

app.post("/searchmovie", (req, res) => {
    var options = {
        uri: 'http://www.omdbapi.com',
        qs: {
            apikey: 'thewdb',
            s: req.body.title
        }
    } 
    rp(options)
    .then((result) =>{
        var parsedData = JSON.parse(result);
        console.log(parsedData.Search);
        parsedData.Search.forEach(function(searchResult){
            var movie = {
                title: searchResult.Title,
                year: searchResult.Year,
                imdbID: searchResult.imdbID,
                type: searchResult.Type,
                poster: searchResult.Poster  
            }
            movieList.push(movie);
        });
        console.log(movieList.length);
    })
    .catch((err) =>{
        console.log('Error: ', err);
    })
  res.redirect("/listmovies");
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
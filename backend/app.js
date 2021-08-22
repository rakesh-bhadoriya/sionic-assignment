const express = require("express");
const bodyParser = require("body-parser");
// const db = require("./database");
var app = express();
const port = 4000;
//creating connection client

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", function (req, res) {
    res.send("Server running !");
})

// api to get user details 
app.get("/users", async function (req, res) {
    const users = await db.pool.query("select * from users");
    // sort by username
    try {
        //const users = await db.pool.query("select * from users");
        if (users && users.length == 0) {
            return res.status(404).send("users not found");
        }
        const util = require("./helper/util");
        users = util.sort(users);
        return res.send(users);
    } catch (ex) {
        console.error("Error occured in fetching the user details : ", ex);
        throw ex;
    }
});

// api to get user detalis using userId
app.get("/users/:id", async function (req, res) {
    try {
        var userId = req.params.id;
        const user = await db.pool.query("select * from users where id = ? ", userId);
        if (!user) {
            return res.status(404).send("user not found");
        }
        return res.send(user);
    } catch (ex) {
        console.error("Error occured in fetching the user details : ", ex);
        throw ex;
    }
});

app.post("/login", async function (req, res) {
    var cred = req.body;
    if (!(cred.email && cred.password)) {
        return res.status(404).send("Please provide mandatory fields for login");
    }
    const user = await db.pool.query("select * from users where email = ? and password = ? ", cred.email, cred.password);
    if (!user) {
        return res.status(401).send("Login failed!");
    } else {
        return res.status(200).send(user);
    }

});

app.listen(port, () => {
    console.log("Server is listening on : " + port);
});
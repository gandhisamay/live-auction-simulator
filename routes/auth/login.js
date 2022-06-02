const express = require("express");
const mysqlConnection = require("../../connection");
const { parser } = require("../../middleware");
const fs = require("fs");

const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("login", {authentication: "unknown"});
  // res.send("Login Page!");
});

Router.post("/", parser, (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;

  console.log(username);
  let dbPassword;

  let sql = `SELECT * FROM user WHERE username="${username}";`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      if(rows.length == 0){
        res.render("login", { authentication : "failed"});
      }
      dbPassword = rows[0].password;
      console.log(dbPassword);
      //Account does not exist case remaining to be handled

      console.log(dbPassword, " ", password);
      if (dbPassword == password) {
        //Login successfull
        req.session.username = username;
        res.statusCode = 200;
        res.statusMessage = "Login Successfull";
        res.redirect("/items");
      } else {
        //Login failed
        res.statusCode = 401;
        res.send("Unauthorized. Login failed");
      }
    } else console.log(err);
  });

  //Now verify that the password is correct
  // let dbPassword = dbPassword["password"];
  // res.send("Request received");
});

module.exports = Router;

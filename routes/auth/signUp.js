const express = require("express");
const db = require("../../connection");
const { parser } = require("../../middleware");

const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("signup");
});

Router.post("/", parser, (req, res) => {
  let body = req.body;
  let {username, password} = body

  //First check for account existence
  let accountExistenceSql = `SELECT * FROM user WHERE username="${username}";`;
  db.query(accountExistenceSql, (err, rows, fields)=>{
    if(!err){
      if(rows.length === 1) {
        res.statusCode = 409;
        res.send("Already Exists");
        res.redirect("/");
      }
    }
    else console.log(err);
  });

  let sql = `INSERT INTO user(username, password) VALUES ("${username}", "${password}")`;
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      req.session.username = username;
      console.log(req.session.username);
      res.redirect("/login");
    } else console.log(err);
  });
});

module.exports = Router;

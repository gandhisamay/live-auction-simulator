const express = require("express");
const db = require("../../connection");

const Router = express.Router();

Router.get("/", (req,res)=>{
    let username  = req.session.username;

    let sql = `SELECT * FROM items WHERE owner_username="${username}"`;

    db.query(sql, (err, rows, fields)=>{
        if(!err){
            res.render("listed", {items: rows});
        }
        else console.log(err);
    })
});



module.exports = Router;
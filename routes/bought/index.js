const express = require("express");
const db = require("../../connection");

const Router = express.Router();

Router.get("/", (req,res)=>{
    let username  = req.session.username;

    let sql = `SELECT * FROM soldto NATURAL JOIN items WHERE buyer_username="${username}"`;

    db.query(sql, (err, rows, fields)=>{
        if(!err){
            res.render("bought", {items: rows});
        }
        else console.log(err);
    })
});



module.exports = Router;
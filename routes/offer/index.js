const express = require("express");
const db = require("../../connection");

const Router = express.Router();

Router.post("/:itemId", (req,res)=>{
    let itemId = req.params.itemId;
    let {offerValue} = req.body;
    let username = req.session.username;


    let sql = `INSERT INTO offers(item_id, username, offer_time, offer_value) 
               VALUES (${itemId}, "${username}", NOW(), ${offerValue});`;
    db.query(sql, (err, rows, fiels)=>{
        if(!err){
            // console.log(rows);
        }
        else{
            console.log(err);
        }
    });

    res.redirect("/items");
});

module.exports = Router;
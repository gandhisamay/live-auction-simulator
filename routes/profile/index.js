const express = require("express");
const db = require("../../connection")

const Router = express.Router();

Router.get("/", (req,res)=>{
    let sql = `SELECT * FROM items UNION SELECT item_id, buyer_username AS owner_username, name, description, image_url, base_price, buy_now_price, end_date, available_for_sale FROM soldto AS s NATURAL JOIN items`;
    //Bought
    //Item out of sale
    //Item buyer_username = req.session.username

    db.query(sql, (err, rows, fields)=>{
        if(!err){
            res.render("profile", {username: req.session.username, items: rows});
        }
        else console.log(err);
    })
});
module.exports = Router;
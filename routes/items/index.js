const express = require("express");
const db = require("../../connection");
const { parser } = require("../../middleware");
const fs = require("fs");

const Router = express.Router();

//CRUD

//Get all items from database
Router.get("/", (req, res) => {
  let offerAvailableSql =  `SELECT `

  let sql = "SELECT * FROM (select * from offers as o where o.offer_value = (select max(offer_value) from offers as f where o.item_id = f.item_id)) AS MaxBids RIGHT JOIN (SELECT * FROM items WHERE items.end_date > NOW() AND items.available_for_sale = true) AS AvailableItems ON MaxBids.item_id = AvailableItems.item_id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      console.log(`In the items file: ${req.session.username}`);
      // console.log(rows);
      res.render("main", {items: rows});
    } else console.log(err);
  });

});

//Get specific item from the items

//Create a new item in the database

Router.post("/new", parser, (req, res) => {
  let { name, description, imageUrl, basePrice, endDate, buyNowPrice } =
    req.body;

  console.log(endDate.toString());

  let ownerUsername = req.session.username;

  if(!ownerUsername){
    ownerUsername = "Samay";
  }

  let sql = `INSERT INTO items (owner_username, name, description ,image_url ,buy_now_price, base_price, end_date) 
             VALUES ("${ownerUsername}", "${name}", "${description}","${imageUrl}",${buyNowPrice}, ${basePrice}, CAST("${endDate}" AS DATETIME))`;

  db.query(sql, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.redirect("/items");
    } else console.log(err);
  });
  // res.send("Request over");
});

module.exports = Router;

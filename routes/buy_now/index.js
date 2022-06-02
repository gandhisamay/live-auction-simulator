const { parse } = require("dotenv");
const express = require("express");
const db = require("../../connection");
const { parser } = require("../../middleware");

const ROLLBACK = (err) => {
  db.query("ROLLBACK;", [], (rollbackErr) => {
    if (rollbackErr) {
      // Fall back to torching the connection
      db.destroy();
      console.error(rollbackErr);
    }
  });
};

module.exports.ROLLBACK = ROLLBACK;

const Router = express.Router();
//Directly buy a product

Router.post("/:id", parser,(req, res) => {
  //Directly add the item to the sold category
  let itemId = req.params.id;
  let buyerUsername = req.session.username;

  //Need to create and a run a selling procedure here
  let sql = `CALL buyNowProcess(${itemId}, "${buyerUsername}")`;

  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.redirect("/items");
    } else {
        console.log(err);
        ROLLBACK(err);
    }
  });
});

module.exports = Router;

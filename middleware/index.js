//JSON Data parser middleware
const db = require("../connection");

const ROLLBACK = (err) => {
  db.query("ROLLBACK;", [], (rollbackErr) => {
    if (rollbackErr) {
      // Fall back to torching the connection
      db.destroy();
      console.error(rollbackErr);
    }
  });
};

const parser = function (req, res, next) {
  console.log("Working");
  JSON.parse(JSON.stringify(req.body));
  next();
};

const processing = function (req, res, next) {
//   console.log("I'm running");

  let sql = `CALL itemStatusVerifier()`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      ROLLBACK(err);
    }
    // else console.log("Added Successfully");
  });
  next();
};

module.exports.parser = parser;
module.exports.processing = processing;

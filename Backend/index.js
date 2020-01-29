const express = require("express");
const cors = require("cors");
const app = express();
const {
  CONFIG: { backendPort },
  db,
  cloudinary
} = require("./conf");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

//Main GET latest post
app.get("/api/main", (req, res) => {
  const latestPost = req.params.id;
  db.query(
    "SELECT subject, text, image FROM post ORDER BY id DESC LIMIT 1",
    [latestPost],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.listen(backendPort, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
});

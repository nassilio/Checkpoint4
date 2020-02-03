const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const {
  CONFIG: { backendPort },
  db,
  cloudinary
} = require("./conf");

const upload = multer({ dest: "tmp/" });
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

//Main GET last post
app.get("/api/main", (req, res) => {
  const lastPost = req.params.id;
  db.query(
    "SELECT subject, text, image FROM post ORDER BY id DESC LIMIT 1",
    [lastPost],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

//GET search
app.get("/api/search/post", (req, res) => {
  const search = req.query.subject;
  db.query(
    'SELECT subject, image, text FROM post WHERE subject LIKE CONCAT("%"?"%")',
    search,
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//POST image
app.post("/api/postimage", upload.single("file"), (req, res) => {
  const formData = req.file;
  cloudinary.v2.uploader.upload(formData.path, function(err, result) {
    if (err) {
      res.status(500).send("Erreur lors de la sauvegarde de l'image");
    } else {
      res.send(result);
    }
  });
});

//POST text and subject
app.post("/api/post", (req, res) => {
  const formData = req.body;
  db.query("INSERT INTO post SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la sauvegarde du message");
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(backendPort, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
});

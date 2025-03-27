var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Hapus route yang duplikat
app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
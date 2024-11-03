if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer")
const app = express();
const PORT = process.env.PORT || 3000
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const { uploadFile, deleteFile, getObjectSignedUrl } = require('./s3.js')
const crypto = require("crypto")
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUri = process.env.DB_CONNECTION

app.get("/", (req, res) => res.send("Welcome to Server"));

app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file
  const imageName = generateFileName()
  const fileBuffer = file.buffer;
  await uploadFile(fileBuffer, imageName, file.mimetype)
  const url = await getObjectSignedUrl(imageName)
  res.status(200).send({ url })
})

app.use(routes);
app.use(errorHandler);

mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 8000 })
  .then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to CosmosDB:", err));

require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const path = require("path");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(express.json());
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);
app.use(routes);

server.listen(process.env.PORT || 3000);

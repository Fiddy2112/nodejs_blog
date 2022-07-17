const express = require("express");

const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");

const { engine } = handlebars;

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//main
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/news", function (req, res) {
  res.render("news");
});

app.get("/search", (req, res) => {
  res.render("search");
  // console.log(req.query); khi su dung query parameter thi phai dung req.query
});

app.post("/search", (req, res) => {
  // console.log(req.body); khi su dung form thi dung req.body
  console.log(req.body);
  res.send("");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// import express from "express";
// import { engine } from "express-handlebars";

// const app = express();

// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./views");

// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.listen(3000);

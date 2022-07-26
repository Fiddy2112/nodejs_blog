const express = require("express");

const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");

const route = require("./routes");
// Import DB
const db = require("./config/db");

//Connect to db
db.connect();

const { engine } = handlebars;

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override
app.use(methodOverride("_method"));

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum(a, b) {
        return a + b;
      },
    },
  })
);
// const hbs = create({
//   helpers: {
//     sum(a, b) {
//       return a + b;
//     },
//   },
// });
// app.engine("handlebars", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));

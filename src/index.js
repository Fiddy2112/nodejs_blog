const express = require("express");

const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");

const SortMiddleware = require("./app/middleware/SortMiddleware");

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

// Custom Middleware
app.use(SortMiddleware);

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
      sortable(field, sort) {
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "bi bi-arrow-down-up",
          asc: "bi bi-sort-down-alt",
          desc: "bi bi-sort-down",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href='?_sort&column=${field}&type=${type}'><span style="color: cornflowerblue;font-size: 0.9rem;" class="${icon}"></span></a>`;
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

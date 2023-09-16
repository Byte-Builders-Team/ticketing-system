const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./db");
const userRouter = require("./routes/user-router");
const categoryRouter = require("./routes/category-router");
const ticketRouter = require("./routes/tickets-router");
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Catch-all route for handling unknown URLs

app.use(userRouter);
app.use(categoryRouter);
app.use(ticketRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

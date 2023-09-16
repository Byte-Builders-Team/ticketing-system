const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const db = require("./db");
const userRouter = require("./routes/user-router");
const categoryRouter = require("./routes/category-router");
const ticketRouter = require("./routes/tickets-router");

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Specify the version of OpenAPI (Swagger)
    info: {
      title: ' Byte Builders API ',
      version: '1.0.0',
      description: 'API For Ticketing System.',
    },
    servers: [
      {
        url: "http://localhost:3000/"
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(swaggerOptions)


const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
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
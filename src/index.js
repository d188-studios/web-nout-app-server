const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const routes = require("./api/routes");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

app.listen(port, () => {
  console.log("Server is running on port " + port);
  sequelize.sync({ force: true });
});

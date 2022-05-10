const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const routes = require("./api/routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  //sequelize.sync({ force: true });
});

const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

require("dotenv").config();

const userRoutes = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

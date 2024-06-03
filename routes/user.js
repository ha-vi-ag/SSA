const express = require("express");

const userController = require("../controller/user");

const router = express.Router();

router.get("/", userController.getHome);

router.get("/test", userController.getTest);

router.post("/score", userController.findScore);

module.exports = router;
const express = require('express');
const router = express.Router();
const { homePage, showTodo } = require("../controller/webcontroller");

// Home page
router.get("/", homePage);

// Rendered Todo page
router.get("/todo", showTodo);

module.exports = router;

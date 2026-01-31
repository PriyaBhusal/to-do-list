const express = require('express');
const router = express.Router();
const { 
  homePage, 
  addTodos, 
  showTodos, 
  updateTodo, 
  deleteTodo, 
  getTodoById 
} = require("../controller/todocontroller");

const { 
  userRegister, 
  userLogin, 
  updateUser, 
  deleteUser 
} = require("../controller/usercontroller");

const upload = require('../middleware/imageUpload');
const tokenVerify = require('../middleware/verifyToken');

// --- Home route ---
router.get("/", homePage);

// --- User routes ---
router.post("/register", userRegister);
router.post("/login", userLogin);
router.patch("/user/:id", tokenVerify.verifyToken, updateUser);
router.delete("/user/:id", tokenVerify.verifyToken, deleteUser);

// --- Todo routes ---
router.post("/todo", tokenVerify.verifyToken, upload.single("banner"), addTodos);
router.get("/todo", tokenVerify.verifyToken, showTodos); // Protect this route
router.patch("/todo/:id", tokenVerify.verifyToken, upload.single("banner"), updateTodo);
router.delete("/todo/:id", tokenVerify.verifyToken, deleteTodo);
router.get("/todo/:id", tokenVerify.verifyToken, getTodoById);

module.exports = router;

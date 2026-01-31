const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models');
const { getAllTodo } = require('./services');

// Render home page
const homePage = (req, res) => {
    res.render('home', { title: "Home-Page" });
};

// Add a new Todo
const addTodos = async (req, res) => {
    try {
        const data = req.body;

        // Check if file exists
        if (req.file) {
            data.todoBanner = "http://localhost:5000/" + req.file.path;
        } else {
            data.todoBanner = null; // optional default image
        }

        const newTodo = await model.todo.create({
            title: data.title,
            description: data.description,
            actionData: data.actionData,
            todoBanner: data.todoBanner,
            userId: req.userData.id
        });

        res.status(201).json({ message: "Todo added successfully", data: newTodo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Show all Todos
const showTodos = async (req, res) => {
    try {
        const todos = await getAllTodo();
        res.status(200).json({ message: "Todos fetched successfully", data: todos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Update a Todo
const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const data = req.body;

        if (req.file) {
            data.todoBanner = "http://localhost:5000/" + req.file.path;
        }

        // Check if the todo belongs to the user
        const todo = await model.todo.findOne({ where: { id: todoId, userId: req.userData.id } });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or not authorized" });
        }

        await model.todo.update(data, { where: { id: todoId } });
        const updatedTodo = await model.todo.findByPk(todoId);
        res.status(200).json({ message: "Todo updated successfully", data: updatedTodo });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Delete a Todo
const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        const todo = await model.todo.findOne({ where: { id: todoId, userId: req.userData.id } });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or not authorized" });
        }

        await model.todo.destroy({ where: { id: todoId } });
        res.status(200).json({ message: "Todo deleted successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Get Todo by ID
const getTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await model.todo.findByPk(todoId, {
            include: [
                {
                    model: model.user,
                    as: "user",
                    attributes: { exclude: ['password'] }
                }
            ]
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo fetched successfully", data: todo });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = {
    homePage,
    addTodos,
    showTodos,
    updateTodo,
    deleteTodo,
    getTodoById
};

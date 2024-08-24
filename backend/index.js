const express = require('express');
const { createtodo, updatetodo } = require("./zod");
const todo = require("./db");  

const app = express();

app.use(express.json());
app.post("/todo", async function (req, res) {
    const Createpayload = req.body;
    const parsepayload = createtodo.safeParse(Createpayload);

    if (!parsepayload.success) {

        return res.status(400).send(parsepayload.error);
    }

    try {
        const newTodo = await todo.create({
            title: Createpayload.title,
            description: Createpayload.description,
            completed: false
        });

        res.status(201).json({
            message: "Todo created successfully",
            todo: newTodo
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


app.get("/todos", async function (req, res) {
    try {
        const todos = await todo.find({});
        res.json({
            todos
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.put("/completed", async function (req, res) {
    const updatepayload = req.body;
    const parsepayload = updatetodo.safeParse(updatepayload);

    if (!parsepayload.success) {
        return res.status(400).send(parsepayload.error);
    }

    try {
        const updatedTodo = await todo.updateOne(
            { _id: req.body.id },
            { completed: true }
        );

        if (updatedTodo.modifiedCount === 0) {
            return res.status(404).json({ message: 'Todo not found or already completed' });
        }

        res.json({
            message: "Todo updated successfully",
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

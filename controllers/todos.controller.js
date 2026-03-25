const { pool } = require("../config/db");


exports.getTodos = async (req, res) => {

    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            "SELECT * FROM todos WHERE user_id = ?",
            [userId] 
        );

        res.json({
            message: "User's todos",
            todos: rows
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

exports.createTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title } = req.body;
        console.log("title",userId,title)
        const [result] = await pool.query(
            "INSERT INTO todos (user_id, title) VALUES (?, ?)",
            [userId, title]
        );

        res.json({
            id: result.insertId,
            title,
            completed: false
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

exports.toggleTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "UPDATE todos SET completed = NOT completed WHERE id =?",
            [id]
        );
        res.json({
            message: "todo updated successfully"
        })
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "DELETE FROM todos WHERE id = ?",
            [id]
        );
        res.json({
            message: "todo deleted successfully"
        })
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
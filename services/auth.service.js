const { pool } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



exports.signupService = async (data) => {
    const { name, email, password } = data;

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    console.log("existingUser", existing)
    if (existing?.length > 0) {
        throw new Error("User already exists");
    }


    await pool.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );

    return { name, email }


}

exports.loginService = async (data) => {

    const { email, password } = data;

    const [users] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    const user = users?.[0];

    if (!user) {
        throw new Error("User not found");
    }

    if (password !== user.password) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        "mysecretkey",
        { expiresIn: "1h" }
    );

    return { user, token };

};
const { pool } = require("../config/db");

exports.profileController = async (req, res) => {

  try {

    const userId = req.user.id;

    const [rows] = await pool.query(
      "SELECT id, name, email, phone, age, bio FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User profile data",
      user: rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


exports.updateProfileController = async (req, res) => {

  try {
    const userId = req.user.id;

    const { name, phone, age, bio } = req.body;

    await pool.query(
      `UPDATE users SET name = ?, phone = ?, age = ?, bio = ? Where id =?`,
      [name, phone, age, bio, userId]
    );

    res.json({
      message: "Profile updated successfully"
    })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}
const authServices = require('../services/auth.service');

exports.signupController = (req, res) => {
  try {

    const newUser = authServices.signupService(req.body);
    res.json({
      message: "User created",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.loginController = async (req, res) => {
  try {

    const result = await authServices.loginService(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({
      message: "Login successful",
      user: result.user
    });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }
};

exports.logoutController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  });

  res.json({
    message: "Logged out successfully"
  });
};
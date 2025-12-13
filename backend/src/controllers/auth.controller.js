const authService = require("../services/auth.service");

// register controller
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};

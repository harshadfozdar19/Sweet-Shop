const authService = require("../services/auth.service");

//register controller
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


//login controller
const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//get current logged-in user controller
const getMe = async (req, res) => {
  try {
    // req.user is populated by auth middleware
    return res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  register,
  login,
  getMe,
};

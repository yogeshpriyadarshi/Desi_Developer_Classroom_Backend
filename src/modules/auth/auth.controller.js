const UserSchema = require("../user/user.mdoel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await UserSchema.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserSchema.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: createdUser._id,
        email: createdUser.email,
      },
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const access_token = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "7d",
    });

    const refresh_token = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });
    // send refresh token in coockies
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      access_token,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const refresh = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      return res.status(200).json({
        success: false,
        message: "Refresh token not found",
      });
    }
    const decodedToken = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
    const user = await UserSchema.findById(decodedToken.id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const access_token = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "Refresh token refreshed successfully",
      access_token,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const verifyToken = async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: "token is valid",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "token is not valid",
    });
  }
};

module.exports = {
  login,
  signup,
  refresh,
  verifyToken,
  logout,
};

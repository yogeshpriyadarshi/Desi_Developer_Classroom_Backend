const express = require("express");
const {
  login,
  signup,
  refresh,
  verifyToken,
  logout,
} = require("./auth.controller");
const { authMiddleware } = require("./auth.middleware");

const route = express.Router();
route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", authMiddleware, logout);
route.post("/refresh", authMiddleware, refresh);
route.get("/verify-token", authMiddleware, verifyToken);

module.exports = route;

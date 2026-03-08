const express = require("express");
const UserSchema = require("./user.mdoel");

const route = express.Router();

// create api
route.post("/create", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
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
    const createdUser = await UserSchema.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      createdUser,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

//update profile
route.put("/:id/update-profile", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "User ID is required",
      });
    }

    let user = await UserSchema.findById(id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    user = await UserSchema.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        password,
      },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// get api
route.get("/fetch-all", async (req, res) => {
  try {
    const users = await UserSchema.find({ status: "active" });
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      users,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// get by Id
route.get("/fetch-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await UserSchema.findById(id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// update api
route.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await UserSchema.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        password,
      },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// delete api
route.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await UserSchema.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = route;

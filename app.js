const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const dbConfig = require("./src/config/dbConfig");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5555",
      "https://desi-developer-classroom-frontend.onrender.com",
      "https://quiz-frontend-1.onrender.com",
    ], // your frontend URL EXACT
    credentials: true, // very important
  }),
);
app.use(cookieParser());

// route
app.use("/api", require("./src/modules/api.route"));

dbConfig();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.send("Hello World!");
});
route.use("/auth", require("./auth/auth.routers"));
route.use("/users", require("./user/user.routers"));
route.use("/todolists", require("./todolist/todolist.routers"));
route.use("/subjects", require("./subject/subject.routes"));
route.use("/topics", require("./topic/topic.routes"));
route.use("/concepts", require("./concept/concept.routers"));
route.use("/questions", require("./question/route/question.routers"));
route.use("/task-management", require("./taskManagement/routers/taskRouter"));
route.use("/dsa", require("./DSA/dsa.routers"));
route.use("/interview", require("./interview/interview.routers"));

// online code editor
route.post("/run", async (req, res) => {
  try {
    const { code, language } = req.body;

    // Language IDs (Judge0)
    const languageMap = {
      javascript: 63,
      python: 71,
      cpp: 54,
    };

    const language_id = languageMap[language];

    // 1️⃣ Submit code
    const submission = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
      {
        source_code: code,
        language_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      },
    );

    const token = submission.data.token;

    // 2️⃣ Wait & fetch result
    let result;
    while (true) {
      const res2 = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        },
      );

      result = res2.data;

      if (result.status.id > 2) break; // finished
      await new Promise((r) => setTimeout(r, 1000));
    }

    // 3️⃣ Send output
    res.json({
      output:
        result.stdout || result.stderr || result.compile_output || "No output",
    });
  } catch (error) {
    res.status(500).json({ error: "Execution failed" });
  }
});

module.exports = route;

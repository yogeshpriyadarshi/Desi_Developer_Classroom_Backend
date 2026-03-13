const XLSX = require("xlsx");
const Question = require("../schema/Question.Schema");

exports.bulkUploadQuestions = async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const questions = [];
    const errors = [];

    rows.forEach((row, index) => {
      const options = [
        row.option1,
        row.option2,
        row.option3,
        row.option4,
        row.option5,
      ];

      if (options.length !== 5) {
        errors.push(`Row ${index + 1}: Must have 5 options`);
        return;
      }

      if (row.correctAnswer > 4 || row.correctAnswer < 0) {
        errors.push(`Row ${index + 1}: Correct answer must be 0-4`);
        return;
      }

      questions.push({
        questionText: row.questionText,
        options,
        correctAnswer: row.correctAnswer,
        difficulty: row.difficulty || "medium",
      });
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }

    const inserted = await Question.insertMany(questions, { ordered: false });

    res.status(201).json({
      success: true,
      inserted: inserted.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

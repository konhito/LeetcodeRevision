import express from "express";
import { connectDb } from "./ConnectDb.js";
import { question } from "./DbModals.js";
import cors from "cors";
const app = express();
const port = 5040;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const leet = req.body;
  try {
    let url = leet.link;
    const titlePart = url.match(/\/problems\/([^\/]*)/)[1];

    const formattedTitle = titlePart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    console.log(formattedTitle);

    const quesCount = await question.find({});
    console.log(quesCount.length);

    const sameques = await question.findOne({ title: formattedTitle });

    // Check if the same question already exists
    if (sameques) {
      console.log("Question already exists");
      return res.status(400).json({
        msg: "Question already exists",
      });
    }

    // Save new question to the database
    const newQues = new question({
      id: quesCount.length,
      title: formattedTitle,
      link: url,
    });
    await newQues.save();

    res.status(200).json({
      msg: "Successfully saved the data",
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      msg: "Something went wrong while saving",
    });
  }
});

app.get("/ques", async (req, res) => {
  try {
    // Get current date (year, month, and day only)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Find questions with nextrevision between the start and end of today
    const Todaysques = await question.find({
      nextrevision: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    console.log(Todaysques);

    res.status(200).json(Todaysques);
  } catch (error) {
    console.error("Error fetching today's questions:", error.message);
    res.status(500).json({ msg: "Error fetching data" });
  }
});

app.patch("/update-revision/:id", async (req, res) => {
  const { id } = req.params;
  const { nextrevision } = req.body;

  try {
    const updatedQuestion = await question.findByIdAndUpdate(
      id,
      { nextrevision },
      { new: true } // Return the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ msg: "Question not found" });
    }

    res.status(200).json({ msg: "Revision date updated successfully" });
  } catch (error) {
    console.error("Error updating question:", error.message);
    res.status(500).json({ msg: "Error updating question" });
  }
});

app.listen(port, () => {
  connectDb();
  console.log("Server running on port", port);
});

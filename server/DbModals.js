import mongoose from "mongoose";

const leetcodeSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  link: String,
  createdAT: {
    type: Date,
    default: Date.now,
  },
  nextrevision: {
    type: Date,
    default: Date.now,
  },
});

export const question = mongoose.model("question", leetcodeSchema);

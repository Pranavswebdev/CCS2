import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    projectId: {
      type: ObjectId,
      ref: "Project",
      required: true,
    },

    status: {
      type: String,
      // required: true,
      default: "pending",
      enum: ["pending", "in_progress", "completed"],
    },

    start_date: {
      type: Date,
      default: new Date(),
    },

    end_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);

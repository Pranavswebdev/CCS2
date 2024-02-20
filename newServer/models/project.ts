import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    admin: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    tasks: [
      {
        type: ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

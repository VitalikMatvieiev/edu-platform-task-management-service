const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    course: {
      type: String,
      ref: "Course",
      required: true,
    },

    instructor: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;

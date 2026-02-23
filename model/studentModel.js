import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    course: {
      type: String,
      enum: ["Full Stack", "UI/UX", "Designing"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "terminate"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;

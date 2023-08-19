import mongoose from "mongoose";

const applicationScehma = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
    },
    status: {
      type: String,
      enum: ["pending", "Accepted", "Rejected"],
    },
  },
  {
    timestamps: true,
  }
);

const Application =
  mongoose.models.applications ||
  mongoose.model("applications", applicationScehma);

export default Application;

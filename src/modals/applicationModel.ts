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
      enum: ["pending", "shortlisted", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.applications) {
  const applicationModel = mongoose.model("applications");
  mongoose.deleteModel(applicationModel.modelName);
}

const Application = mongoose.model("applications", applicationScehma);

export default Application;

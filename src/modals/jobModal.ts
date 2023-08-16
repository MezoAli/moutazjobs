import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    salary: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    experience: {
      type: String,
      require: true,
    },
    mode: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);
if (mongoose.models.jobs) {
  const jobModal = mongoose.model("jobs");
  mongoose.deleteModel(jobModal.modelName);
}

const Job = mongoose.model("jobs", jobSchema);
export default Job;

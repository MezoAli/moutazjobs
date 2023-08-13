import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    employmentType: {
      type: String,
      require: true,
      default: "Employee",
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    skills: {
      type: [],
      require: false,
    },
    education: {
      type: [],
      require: false,
    },
    experience: {
      type: [],
      require: false,
    },
    carrierObjective: {
      type: String,
      require: false,
    },
    establishmentYear: {
      type: String,
      require: false,
    },
    about: {
      type: String,
      require: false,
    },
    companySize: {
      type: String,
      require: false,
    },
    website: {
      type: String,
      require: false,
    },
    address: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);
if (mongoose.models.users) {
  const userModal = mongoose.model("users");
  mongoose.deleteModel(userModal.modelName);
}

const User = mongoose.model("users", userSchema);
export default User;

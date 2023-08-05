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

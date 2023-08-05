import mongoose from "mongoose";

export function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URL!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connected successfully");
    });

    connection.on("error", (error) => {
      console.log("connected failed");
    });
  } catch (error) {
    console.log("error", error);
  }
}

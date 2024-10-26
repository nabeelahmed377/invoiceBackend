import express from "express";
const app = express();
import invoice from "./model/invoiceModel.js";

app.get("/", async (req, res) => {
  try {
    const Invoice = await invoice.find();
    res.status(200).json({
      status: true,
      message: "All Invoice Found",
      data: Invoice,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("Server ready on port 3000.");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database failed to connect: ", error);
  }
};

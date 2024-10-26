import express from "express";
import invoice from "../models/invoiceModel.js";
import connectDB from "../utils/dbConnect.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    await connectDB(); // Connect to DB before handling the request
    const invoices = await invoice.find();
    res.status(200).json({
      status: true,
      message: "All Invoices Found",
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

export default app;

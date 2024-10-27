import express from "express";
import invoice from "../model/invoiceModel.js";
import connectDB from "../utils/dbConnect.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specified HTTP methods
    credentials: true, // Allow cookies and other credentials
  })
);

app.options("*", cors());

connectDB();
app.get("/", async (req, res) => {
  try {
    const invoices = await invoice.find();
    res.status(200).json({
      status: true,
      message: "All Invoices Founds",
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

app.post("/", async (req, res) => {
  try {
    const newInvoice = new invoice(req.body);
    const savedInvoice = await newInvoice.save();
    return res.status(200).json({
      status: true,
      message: "Invoice added successfully",
      data: savedInvoice,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getSingle = await invoice.findById(id);
    res.status(200).json({
      status: true,
      message: "Invoice Found",
      data: getSingle,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateInv = await invoice.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Invoice Update Successfully",
      data: updateInv,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteInv = await Invoice.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Invoice Delete Successfully",
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Record Not Deleted", error });
  }
});

export default app;

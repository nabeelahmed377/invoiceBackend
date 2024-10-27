import express from "express";
import invoice from "../model/invoiceModel.js";
import connectDB from "../utils/dbConnect.js";
import cors from "cors";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors()); // Preflight requests
app.use(express.json()); // Parse JSON payloads

// Initialize database connection
connectDB();

// Routes
app.get("/api/invoices", async (req, res) => {
  try {
    const invoices = await invoice.find();
    res.status(200).json({
      status: true,
      message: "All Invoices Foundeseesese",
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
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
    res.status(200).json({
      status: true,
      message: "Invoice added successfully",
      data: savedInvoice,
    });
  } catch (error) {
    console.error("Error adding invoice:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

app.get("/api/invoices/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingle = await invoice.findById(id);
    if (!getSingle) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Invoice Found",
      data: getSingle,
    });
  } catch (error) {
    console.error("Error fetching invoice by ID:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateInv = await invoice.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updateInv) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Invoice Updated Successfully",
      data: updateInv,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteInv = await invoice.findByIdAndDelete(id);
    if (!deleteInv) {
      return res.status(404).json({
        status: false,
        message: "Invoice not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Invoice Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
});

export default app;

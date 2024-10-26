import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  clientDetails: {
    customerName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split("T")[0],
    },
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    advance: {
      type: Number,
      default: 0,
    },
  },

  items: [
    {
      description: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      rate: {
        type: Number,
        required: true,
        min: 0,
      },
      amount: {
        type: Number,
      },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  balanceAmount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Invoice", invoiceSchema);

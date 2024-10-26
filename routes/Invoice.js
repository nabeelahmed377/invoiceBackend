import express from "express";

import {
  getAllInvoice,
  addInvoice,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controller/invoiceController.js";

const router = express.Router();

router.post("/", addInvoice);
router.get("/", getAllInvoice);
router.get("/:id", getSingleInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;

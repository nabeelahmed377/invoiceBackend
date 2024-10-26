import Invoice from "../model/invoiceModel.js";

export const getAllInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.find();
    res.status(200).json({
      status: true,
      message: "All Invoice Found",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const addInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
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
};
export const getSingleInvoice = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingle = await Invoice.findById(id);
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
};

export const updateInvoice = async (req, res) => {
  const id = req.params.id;
  try {
    const updateInv = await Invoice.findByIdAndUpdate(
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
};

export const deleteInvoice = async (req, res) => {
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
};

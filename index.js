import express from "express";
const app = express();

app.get("/", (req, res) =>
  res.send("Express on Vercellllllllllllllllllllllll")
);

app.listen(3000, () => console.log("Server ready on port 3000."));

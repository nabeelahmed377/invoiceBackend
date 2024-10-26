// Import express
import express from "express.js";
const app = express();

// Define your routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});

// Catch-all route for undefined routes (404)
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

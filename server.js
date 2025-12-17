const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

ConnectDB();

app.app.get("/", (req, res) => {
  res.send("Student Event Approval Backend is running!");
});


app.use("/api/auth",authRoutes);
app.use("/api/events",eventRoutes);

const PORT = process.env.PORT;

app.listen(PORT,()=>console.log('Student Approval App Running...'))

module.exports = app;
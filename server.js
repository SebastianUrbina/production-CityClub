const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

//DOTENV
dotenv.config();

//MONGODB CONNECTION
connectDB();

//CLOUDINARY CONFIG

//REST OBJECT
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/party", require("./routes/partyRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Runing on ${PORT}`.bgGreen.white);
});

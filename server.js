import express from "express";
import HttpError from "./middleware/HttpError.js";
import router from "./routes/studentRoute.js";
import connectDB from "./db/mongoose.js";

const app = express();
app.use(express.json());

app.use("/student", router);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

app.use((req, res, next) => {
  next(new HttpError("Route Not Found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Server Error" });
});

const port = process.env.PORT || 3000;

async function serverStart() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("server is running on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
serverStart();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/api/users");
const carsRouter = require("./routes/api/cars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// логування
app.use(logger(formatsLogger));

// дозволяємо запити з усіх серверів
app.use(cors());

// переводить баді з джейсону в обект
app.use(express.json());
// app.use(express.static("public"));

// виносимо маршрути в окремі файли
app.use("/api/users", usersRouter);
app.use("/api/cars", carsRouter);

// не знайдено адреси, доходить до цього мідлвару
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обробник помилок, бо 4 параметри
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

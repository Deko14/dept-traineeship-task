const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// App
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`A NodeJS API is listenint on port: ${port}`)
);

// Routes
const movieRoutes = require("./routes/movie");
const showRoutes = require("./routes/show");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use("/", movieRoutes);
app.use("/", showRoutes);

// Docs
app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

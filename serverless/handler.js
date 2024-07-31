
const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());

// Import the router
const AboutManagementRouter = require('./Router/AboutManagementRouter');

// Use the router
app.use('/AboutManagementRouter', AboutManagementRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);

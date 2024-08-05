
const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

// Import the router
const AboutManagementRouter = require('./Router/AboutManagementRouter');
const ReviewManagementRouter = require('./Router/ReviewManagementRouter');
const AuthMangaementRouter  = require('./Router/UserManagementRouter');
// Use the router
app.use('/AboutManagementRouter', AboutManagementRouter);
app.use('/ReviewManagementRouter', ReviewManagementRouter);
app.use('/AuthMangaementRouter',AuthMangaementRouter)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);

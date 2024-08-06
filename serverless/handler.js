
const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // specify allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Start Block Setting th Headers for your Application

//End Block Setting the Header for your Application

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

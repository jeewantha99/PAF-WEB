const { json } = require("express");

//error handling for not found url
const notFound = (req, res, next) => {
  const error = new Error(`NoT Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res,
    json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };

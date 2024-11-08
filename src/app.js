// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { morganMiddleware } = require('./interfaces/middleware/logger');
const connectDB = require('./config/database');
const errorHandler = require('./interfaces/middleware/errorHandler');
const container = require('./config/container');
const { scopePerRequest, loadControllers, loadServices } = require('awilix-express');
require('dotenv').config();
require('express-async-errors'); // Handle async errors

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

// Setup Awilix DI
app.use(scopePerRequest(container));

// Load controllers using Awilix Express
app.use(loadControllers('interfaces/controllers/*.js', { cwd: __dirname }));

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;

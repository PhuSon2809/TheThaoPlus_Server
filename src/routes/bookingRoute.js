const express = require('express');
const bodyParser = require('body-parser');

const { authMiddleware, isOwner } = require('../middlewares/authMiddleware');

const bookingRouter = express.Router();

bookingRouter.use(bodyParser.json());

module.exports = bookingRouter;

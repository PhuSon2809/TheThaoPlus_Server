const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
import { capturePayment, createOrder } from './paypal-api';

const swaggerFile = require('./swagger_output.json');
const connectDatabase = require('./config/database');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const router = require('./routes/Routes');

connectDatabase();

const app = express();
app.use(cors({ origin: true }));

// app.use(express.static('public'));
app.use(express.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const hostname = 'localhost';
let port = process.env.PORT || 8080;

app.use('/', router);

// app.post('/api/my-server/create-paypal-order', async (req, res) => {
//   try {
//     const order = await createOrder(req.body);
//     res.json(order);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.post('/api/my-server/capture-paypal-order', async (req, res) => {
//   const { orderID } = req.body;
//   try {
//     const captureData = await capturePayment(orderID);
//     res.json(captureData);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(notFound);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

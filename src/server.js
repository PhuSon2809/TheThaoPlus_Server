const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');

const swaggerFile = require('./swagger_output.json');
const connectDatabase = require('./config/database');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const router = require('./routes/Routes');

connectDatabase();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const hostname = 'localhost';
let port = process.env.PORT || 8080;

app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(notFound);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

const express = require('express');

const router = express.Router();

const roleRoute = require('./roleRoute');
const authRoute = require('./authRoute');
const sportRoute = require('./sportRoute');
const sportCenterRoute = require('./sportCenterRoute');
const sportFieldRoute = require('./sportFieldRoute');
const bookingRoute = require('./bookingRoute');

router.use('/api/role', roleRoute);
router.use('/api/user', authRoute);
router.use('/api/sport', sportRoute);
router.use('/api/sport-center', sportCenterRoute);
router.use('/api/sport-field', sportFieldRoute);
router.use('/api/booking', bookingRoute);

module.exports = router;

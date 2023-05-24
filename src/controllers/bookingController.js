const asyncHandler = require('express-async-handler');
const SportCenters = require('../models/sportCenterModel');
const Bookings = require('../models/bookingModel');

const createBooking = asyncHandler(async (req, res) => {
  const { sportCenterId, booking } = req.body;

  try {
    const newBooking = await Bookings.create(booking);
    addToSportCenter(sportCenterId, newBooking);
    res.status(201).json({
      status: 201,
      message: 'Sport Field created successfully.',
      newBooking: newBooking,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const addToSportCenter = async (sportCenterId, newBooking) => {
  try {
    const sportCenter = await SportCenters.findById(sportCenterId);
    const alreadyBooking = sportCenter.Bookings.find(
      (id) => id.toString() === newBooking._id
    );

    if (!alreadyBooking) {
      await SportCenters.findByIdAndUpdate(
        sportCenterId,
        {
          $push: { Bookings: newBooking._id }, //Thêm vào mảng sportCenters
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const listBookings = await Bookings.find();
    res.status(200).json({
      status: 200,
      results: listBookings.length,
      listBookings: listBookings,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let isValid = await Bookings.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const getBooking = await Bookings.findById(id);
    res.status(200).json({
      status: 200,
      getBooking: getBooking,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let isValid = await Bookings.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const updateBooking = await Bookings.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      message: 'Sport updated successfully.',
      updateBooking: updateBooking,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let isValid = await Bookings.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const block = await Bookings.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'Sport Field Blocked.',
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unBlockBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let isValid = await Bookings.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const block = await Bookings.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'Sport Field Unblocked.',
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { id, sportCenterId } = req.params;
  let isValid = await Bookings.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const deleteBooking = await Bookings.findByIdAndDelete(id);
    removeToSportCenter(sportCenterId, id);
    res.status(200).json({
      status: 200,
      message: 'Sport Field deleted successfully.',
      deleteBooking: deleteBooking,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const removeToSportCenter = async (sportCenterId, BookingId) => {
  try {
    const sportCenter = await SportCenters.findById(sportCenterId);
    const alreadyBooking = sportCenter.Bookings.find(
      (id) => id.toString() === BookingId
    );

    if (alreadyBooking) {
      await SportCenters.findByIdAndUpdate(
        sportCenterId,
        {
          $pull: { Bookings: BookingId }, //Thêm vào mảng sportCenters
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  blockBooking,
  unBlockBooking,
};

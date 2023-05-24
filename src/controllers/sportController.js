const asyncHandler = require('express-async-handler');
const Sports = require('../models/sportModel');
const Users = require('../models/userModel');

const createSport = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = Create new sport - { "name": "football" }
  */
  const { name } = req.body;
  try {
    const newSport = await Sports.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Sport created successfully.',
      newSport: newSport,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllSports = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = "Create new sport"
  */
  try {
    const listSport = await Sports.find();
    res.status(200).json({
      status: 200,
      results: listSport.length,
      listSport: listSport,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getSport = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = "Get one sport - detail"
  */
  const { id } = req.params;
  let isValid = await Sports.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const getSport = await Sports.findById(id);
    res.status(200).json({
      status: 200,
      getSport: getSport,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateSport = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = Update sport by ID - { "name": "football" }
  */
  const { id } = req.params;
  let isValid = await Sports.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  const { name } = req.body;
  try {
    const updateSport = await Sports.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 200,
      message: 'Sport updated successfully.',
      updateSport: updateSport,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockSport = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = "Update sport status by ID - Block sport"
  */
  const { id } = req.params;
  let isValid = await Sports.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const block = await Sports.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'Sport Blocked.',
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unBlockSport = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = "Update sport status by ID - Unblock sport"
  */
  const { id } = req.params;
  let isValid = await Sports.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const block = await Sports.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    res.status(202).json({
      status: 202,
      message: 'Sport Unblocked.',
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSport = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = "Delete sport by ID"
  */
  const { id } = req.params;
  let isValid = await Sports.findById(id);
  if (!isValid) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const deleteSport = await Sports.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: 'Sport deleted successfully.',
      deleteSport: deleteSport,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const addToSportOwnerList = asyncHandler(async (req, res) => {
  /* 
    #swagger.tags = ['Sport']
    #swagger.description = "Add sport to sport's list of Owner"
  */
  const { _id } = req.user;
  const { sportId } = req.body;

  let isValidUser = await Users.findById(_id);
  if (!isValidUser) {
    throw new Error('User id is not valid or not found');
  }

  let isValidSport = await Sports.findById(sportId);
  if (!isValidSport) {
    throw new Error('Sport id is not valid or not found');
  }

  try {
    const user = await Users.findById(_id);
    const alreadyAdded = user.sportList.find((id) => id.toString() === sportId);
    if (alreadyAdded) {
      let user = await Users.findByIdAndUpdate(
        _id,
        {
          $pull: { sportList: sportId }, //Để xóa khỏi mảng SportList
        },
        { new: true }
      );
      res.status(200).json({
        status: 200,
        user: user,
      });
    } else {
      let user = await Users.findByIdAndUpdate(
        _id,
        {
          $push: { sportList: sportId }, //Thêm vào mảng SportList
        },
        { new: true }
      );
      res.status(200).json({
        status: 200,
        user: user,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createSport,
  getAllSports,
  getSport,
  updateSport,
  deleteSport,
  blockSport,
  unBlockSport,
  addToSportOwnerList,
};

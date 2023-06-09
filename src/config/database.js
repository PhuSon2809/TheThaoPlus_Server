const mongoose = require('mongoose');

process.env.MONGODB_URI =
  'mongodb+srv://phuson2809:28092001@cluster0.qyv6w3z.mongodb.net/thethaoplus';

const connectDatabase = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI).then((data) => {
      console.log(`Mongodb connected with server: ${process.env.MONGODB_URI}`);
    });
  } catch (error) {
    console.log('Database connection error');
  }
};

module.exports = connectDatabase;

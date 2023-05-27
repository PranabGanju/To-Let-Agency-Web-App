const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  roomid: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  frommonth : {
    type : String,
    required : true
  },
  tomonth : {
    type : String,
    required : true
  },
  totalamount: {
    type: Number,
    required: true
  },
  totalmonths : {
    type : Number,
    required : true
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'booked'
  }
}, {
  timestamps: true
});

const BookingModel = mongoose.model('bookings', bookingSchema);

module.exports = BookingModel;

const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const { room, userid, roomid, frommonth, tomonth, totalmonths, totalamount } =
    req.body;

  try {
    const newbooking = new Booking({
      room,
      roomid,
      userid,
      frommonth: moment(frommonth, "MMMM YYYY").format("DD-MM-YYYY"),
      tomonth: moment(tomonth, "MMMM YYYY").format("DD-MM-YYYY"),
      totalmonths,
      totalamount,
      transactionId: "1234",
    });

    const booking = await newbooking.save();

    const roomtemp = await Room.findOne({ _id: roomid });

    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(frommonth).format("DD-MM-YYYY"),
      todate: moment(tomonth).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();

    res.send("Room Booked Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

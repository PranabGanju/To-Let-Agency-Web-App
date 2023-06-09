const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51NCPxOSFe2XCu71RIoZsG8Nbf1LPyixd1rurySK6JiHyNIprErwQbjXlb8ouCKyoJakAupllb5KbbV0Exi3LtvhQ00QgmVoLlO"
);

router.post("/bookroom", async function (req, res) {
  const {
    room,
    userid,
    roomid,
    frommonth,
    tomonth,
    totalmonths,
    totalamount,
    token,
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalamount * 100,
      currency: "INR",
      customer: customer.id,
      receipt_email: token.email,
      payment_method: token.card.id,
      confirm: true,
    });

    if (paymentIntent.status === "requires_action") {
      const { use_stripe_sdk } = paymentIntent;
      if (use_stripe_sdk && use_stripe_sdk.type === "three_d_secure_redirect") {
        // Inform the user that the payment requires 3D Secure authentication
        return res.status(200).json({
          error: "Payment requires 3D Secure authentication",
          clientSecret: paymentIntent.client_secret,
        });
      }
    }

    const frommonthFormatted = moment(frommonth, "MMMM YYYY");
    const tomonthFormatted = moment(tomonth, "MMMM YYYY");

    const newBooking = new Booking({
      room: room.name,
      roomid,
      userid,
      frommonth: frommonthFormatted.format("DD-MM-YYYY"),
      tomonth: tomonthFormatted.format("DD-MM-YYYY"),
      totalmonths,
      totalamount,
      transactionId: token.id,
      token,
    });

    const booking = await newBooking.save();

    const roomtemp = await Room.findOne({ _id: roomid });

    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: frommonthFormatted.format("DD-MM-YYYY"),
      todate: tomonthFormatted.format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();

    return res.send("Payment Successful, Your Room is Booked");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;
  try {
    const booking = await Booking.find({ userid: userid });
    res.send(booking);
  } catch (error) {
    return res.status(200).json({ error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });
    booking.status = "cancelled";
    await booking.save();

    const room = await Room.findOne({ _id: roomid });

    const bookings = room.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    room.currentbookings = temp;

    await room.save();

    res.send("Your Booking is Cancelled Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

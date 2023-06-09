const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// GET all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getroomsbyid/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    
    try {
      const room = await Room.findById(roomId);
      if (room) {
        return res.json(room);
      } else {
        return res.status(404).json({ message: "Room not found" });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });

router.post("/addroom", async(req, res) => {
  try {
    const newroom = new Room(req.body)
    await newroom.save()

    res.send("New Room Added Successfully")


  } catch (error) {
    return res.status(400).json({ error });
    
  }
  
});


module.exports = router;
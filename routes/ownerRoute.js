const express = require("express");
const User = require("../models/user");
const router = express.Router();


router.get("/owner", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email, password: password });
      if (user) {
        const temp = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isOwner: user.isOwner,
          _id: user._id,
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: "Login Failed" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
});

module.exports = router;

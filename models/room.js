const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageurls: [],
    rentpermonth: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    furnishing: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    parking: {
        type: String,
        required: true
    },
    pincode: [Number],
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

const mongoose = require("mongoose");
const slugify = require("slugify");
const messageSchema = new mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"

    },
    message: {
        type: String,
        required: [true, "Plaese add me message name"],
        trim: true,
        maxlength: [50, "message name can't be more than 50 characters"],
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

messageSchema.pre("save", function(next) {
    console.log("name", this.status);
    next();
});

module.exports = mongoose.model("message", messageSchema);
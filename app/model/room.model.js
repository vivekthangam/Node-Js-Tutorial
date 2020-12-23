const mongoose = require("mongoose");
const slugify = require("slugify");
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plaese add me room name"],
        trim: true,
        unique: true,
        maxlength: [50, "room name can't be more than 50 characters"],
    },
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receipant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

roomSchema.pre("save", function(next) {
    console.log("name", this.name);
    next();
});

module.exports = mongoose.model("room", roomSchema);
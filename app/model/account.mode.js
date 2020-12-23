const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  ex_name: {
    type: String,
    required: [true, "Plaese add me Expense name"],
    trim: true,
    unique: true,
    maxlength: [50, "Expense name can't be more than 50 characters"],
  },
  ex_amt:{
      type:Number,
      required:[true, "Plaese add me Expense name"],
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"room"
   
  },
  participant_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  receipant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  timestamp:{
    type:Date,
    default: Date.now
  }
});

ExpenseSchema.pre("save", function (next) {
  console.log("name", this.status);
  next();
});

module.exports = mongoose.model("Expense", ExpenseSchema);

const mongoose = require("mongoose");
const slugify = require("slugify")
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Plaese add me todo name"],
        trim: true,
        unique: true,
        maxlength: [50, "Todo name can't be more than 50 characters"]
    },
    desc: {
        type: String,
        required: [true, "Plaese add me desc"],
        trim: true,
        maxlength: [200, "Todo name can't be more than 200 characters"]
    },
    status: {
        type: String,
        required: [true, "Plaese add me statsus"],
        trim: true,
        maxlength: [50, ""]
    },
    amount: {
        type: Number,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

todoSchema.statics.getAvgAmt = async function(userid) {
    console.log('calculating avg cost....'.blue);
    const obj = await this.aggregate([{
            $match: { user_id: userid }
        },
        {
            $group: {
                _id: '$user_id',
                amount: { $avg: '$amount' }
            }
        }
    ]);
    try {
        const text = await this.model('ToDo').updateMany({ user_id: userid }, {
            amount: Math.ceil(obj[0].amount / 10) * 10
        });
        console.log("vivek");
        console.log(text)
    } catch (err) {
        console.log(err)
    }
    console.log(obj);
    console.log(Math.ceil(obj[0].amount / 10) * 10)
};

todoSchema.post('save', function() {
    console.log(this.user_id)
    console.log(this.constructor.getAvgAmt)
    this.constructor.getAvgAmt(this.user_id)
    console.log("hi")
});
todoSchema.pre('remove', function(next) {
    this.constructor.getAvgAmt(this.user_id)
        // next();
})

module.exports = mongoose.model("ToDo", todoSchema);
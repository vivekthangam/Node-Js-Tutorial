var mongoose = require('mongoose');
const { use } = require('../routes/todo.routes');
var geocoder = require("../utils/geocoder")
require('./todo.model')
var UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: [true, "Please add email id"],
        unique: true
    },
    phone: {
        type: Number,
        unique: true,
    },
    bio: String,
    image: String,
    hash: String,
    salt: String,
    address: {
        type: String,
        required: [true, "Please add address"]
    },
    location: {
        type: {
            type: String,
            enum: ['point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


UserSchema.pre("remove", async function(next) {
    console.log(this.model("ToDo"))
    await this.model("ToDo").deleteMany({ user_id: this._id })
    next()
})
UserSchema.virtual('ToDos', {
    ref: 'ToDo',
    localField: "_id",
    foreignField: "user_id",
    justOne: false
})

/*UserSchema.pre('save', async function(next) {
    console.log("GEOCODER_PROVIDER:", process.env.GEOCODER_PROVIDER)
    console.log("GEOCODER_API_KEY:", process.env.GEOCODER_API_KEY)
    console.log(geocoder)
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'ponit',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].state,
        zipcode: loc[0].zipcode,
        country: loc[0].country
    }
    next();
})*/

module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
const crypto = require("crypto");
const { stringify } = require('uuid');
const { use } = require('../routes/todo.routes');
var geocoder = require("../utils/geocoder")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require('morgan');
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add user name"]
    },
    email: {
        type: String,
        required: [true, "Please add email id"],
        match: [/^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email id"
        ],
        unique: true
    },
    phone: {
        type: Number,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "please add password"],
        minlength: 6,
        select: false

    },
    resetPasswordToken: String,
    resetpasswordExpire: Date,
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

///Hash pPassword
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({
        id: this._id

    }, process.env.JWT_SECRECT, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Match User entered password to hashed passwordin database
UserSchema.methods.matchPassword = async function(enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password)
}


//Generate abd hash password token
UserSchema.methods.getResetPasswordToken = async function(enterdPassword) {
    const resetToekn = crypto.randomBytes(20).toString('hex');

    //Hash token and set to resetTokenPassword field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToekn).digest('hex');
    //set Expires
    this.resetpasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToekn;
}

module.exports = mongoose.model('User', UserSchema);
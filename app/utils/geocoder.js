const Nodegeocoder = require("node-geocoder");
const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: "http",
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
};

const geocoder = Nodegeocoder(options);

console.log(options)

module.exports = geocoder;
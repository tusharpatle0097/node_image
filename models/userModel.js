const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    number: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

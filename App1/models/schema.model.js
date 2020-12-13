const mongoose = require('mongoose');

const detailsSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address : String
}, {
    timestamps: true
});

module.exports = mongoose.model('Details', detailsSchema);
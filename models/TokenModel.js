const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    totalSupply: { type: Number},
    initalPrice: { type: Number, required: true }, // Or other relevant fields related to the token
    tokenAddress : {type : String}
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);


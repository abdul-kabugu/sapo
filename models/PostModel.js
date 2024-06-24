const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: { type: String, required: true }, // User's address
    content: { type: String, required: true },
    media: { type: String }, // IPFS hash or media URL
    likes: [{ type: String }], // List of user addresses
    tags : [{type : String}],
    category : [{type : String}],
    appId : {type : String},
    title : {type : String},
  /* comments: [{
        author: { type: String, required: true }, // User's address
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],*/
    createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Post', postSchema);

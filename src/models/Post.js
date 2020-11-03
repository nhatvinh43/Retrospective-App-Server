const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    created: Date,
    content: {
        type: String,
        required: true,
    },

    comments: [{
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: String,
    }],

    votes: [{
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        count: Number,
    }]
})

module.exports = mongoose.model("Post", postSchema);
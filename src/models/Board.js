const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    created: Date,
    name: String,

    wentWell: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],

    toImprove: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],

    actions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
});

module.exports = mongoose.model('Board', boardSchema);
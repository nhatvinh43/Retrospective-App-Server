const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    created: { type: Date, required: true },
    name: { type: String, required: true },
    lastModified: Date,

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    wentWell: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        content: String,
    }

    ],

    toImprove: [{

        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        content: String,
    }
    ],

    actions: [{

        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        content: String,
    }
    ],
});

module.exports = mongoose.model('Board', boardSchema);
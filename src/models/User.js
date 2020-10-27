const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true, required: true, trim: true},
    username: {type: String, required: true, trim: true, minlength: 3},
    password: {type: String, required: true, trim: true, minlength: 6},
    boards: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Board',
        },
        name: String,
        created: Date,
    }]
});

module.exports = mongoose.model('User', userSchema)
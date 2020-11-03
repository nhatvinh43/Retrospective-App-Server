const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true, minlength: 3 },
    name: String,
    dob: Date,
    email: {type: String, unique: true, required: true, trim: true},
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
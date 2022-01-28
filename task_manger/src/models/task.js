const mongoose = require('mongoose')
const validator = require('validator')
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,

    },
    completed: {
        type: Boolean,
        default: false
    },
    onwer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task
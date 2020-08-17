const mongoose = require('mongoose')
const validator = require('validator')

const savedGameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'    
    },
    rows: {
        type: Number,
        required: true
    },
    cols: {
        type: Number,
        required: true
    },
    bombs: {
        type: Number,
        required: true
    },
    remainingTimer: {
        type: Number,
        required: true
    },
    playedMap: {
        type: Array,
        required: true
    },
    created_at: { type: Date },
    updated_at: { type: Date }
})

savedGameSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
       } else {
        this.updatedAt = Date.now()
       }

    next()
})

const SavedGame = mongoose.model('SavedGame', savedGameSchema)

module.exports = SavedGame
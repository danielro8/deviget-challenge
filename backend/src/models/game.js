const mongoose = require('mongoose')
const validator = require('validator')

const gameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId(),
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
    win: {
        type: Boolean,
        required: true
    },
    created_at: { type: Date },
    updated_at: { type: Date }
})

gameSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createdAt = this.meta.updatedAt = Date.now()
       } else {
        this.updatedAt = Date.now()
       }

    next()
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
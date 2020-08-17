const mongoose = require('mongoose')
const validator = require('validator')

const gameSchema = new mongoose.Schema({
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
    map: {
        type: Array,
        required: true
    },
    playedMap: {
        type: Array,
        required: true
    },
    state: {
        type: String,
        enum : ['active','win', 'defeat'],
        default: 'active'
    },
    created_at: { type: Date },
    updated_at: { type: Date }
})

gameSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createdAt = this.updatedAt = Date.now()
       } else {
        this.updatedAt = Date.now()
       }

    next()
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
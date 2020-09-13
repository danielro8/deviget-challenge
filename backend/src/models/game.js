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
    timer: {
        type: Number,
        default: 60
    },
    map: {
        type: Array,
        required: true
    },
    playedMap: {
        type: Array,
        required: true
    },
    cellsClicked: {
        type: Number,
	default: 1
    },
    state: {
        type: String,
        enum : ['active','win', 'defeat'],
        default: 'active'
    },
    createdAt: { type: Date },
    updatedAt: { type: Date }
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

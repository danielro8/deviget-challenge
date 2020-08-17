const express = require('express')
const Game = require('../models/game')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    const game = new Game(req.body)
    try {
        await game.save()
        res.status(201).send({ game })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/me', auth, async (req, res) => {
    try {
        const games = await Game.find({user: req.user._id}).exec()
        res.send(games)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/:gameId', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['playedMap']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const game = await Game.findById(req.params.gameId)

        updates.forEach((update) => game[update] = req.body[update])
        await game.save()

        if (!game) {
            return res.status(404).send()
        }
        res.send(game)
    } catch (e) {
        console.log('errorr', e);
        res.status(400).send(e)
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        const games = await Game.deleteMany({user: req.user._id})
        res.send(games)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
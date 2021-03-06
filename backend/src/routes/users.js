const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        user.password = undefined
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        user.password = undefined
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        user.password = undefined
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.user._id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        if (!user) {
            return res.status(404).send()
        }
        await req.user.remove()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
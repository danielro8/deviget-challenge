const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const Game = require('../src/models/game')
const User = require('../src/models/user')
const {
    nestedArray,
    populateNestedArray,
    valsAdjacentCounts,
    populatePlayedMap
} = require("../src/helpers");
const userOneId = new mongoose.Types.ObjectId()
const gameOneId = new mongoose.Types.ObjectId()
const token = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET, { expiresIn: '7 days' })
const userOne = {
    _id: userOneId,
    name: 'John Doe',
    email: 'john@doe.com',
    password: '33r342r34f!!'
}
const gameOne = {
    _id: gameOneId,
    user: userOne._id,
    rows: 10,
    cols: 10,
    bombs: 20,
    map: valsAdjacentCounts(
        populateNestedArray(nestedArray(10, 10), "☀", 20),
        "☀"
    ),
    playedMap: populatePlayedMap(10, 10),
    state: 'active'

}
beforeEach(async () => {
    await User.deleteMany()
    await Game.deleteMany()
    await new User(userOne).save()
    await new Game(gameOne).save()
})

test('Should create a new game', async () => {
    const response = await request(app).post('/games').send({
        user: userOne._id,
        rows: 10,
        cols: 10,
        bombs: 20,
    }).expect(201)
})

test('Should get all user games', async () => {
    const response = await request(app).get('/games/me')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(200)
})

test('Should not get all current games for unauthenticate user', async () => {
    const response = await request(app).get('/games/me')
        .send({})
        .expect(401)
})

test('Should delete all user games', async () => {
    await request(app)
        .delete('/games/me')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200)
})

test('Should not delete all user games for unauthenticate user', async () => {
    await request(app)
        .delete('/games/me')
        .send()
        .expect(401)
})
test('Should save game map', async () => {
    await request(app)
        .patch(`/games/${gameOne._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            playedMap: gameOne.playedMap
        })
        .expect(200)
})
test('Should not save game map for unauthenticate user', async () => {
    await request(app)
        .patch(`/games/${gameOne._id}`)
        .send({
            playedMap: gameOne.playedMap
        })
        .expect(401)
})
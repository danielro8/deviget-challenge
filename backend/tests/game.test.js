const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const token = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET, { expiresIn: '7 days' })
const userOne = {
    _id: userOneId,
    name: 'John Doe',
    email: 'john@doe.com',
    password: '33r342r34f!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should create a new game', async () => {
    const response = await request(app).post('/games').send({
        user: userOne._id,
        rows: 10,
        cols: 10,
        bombs: 20,
        win: true
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
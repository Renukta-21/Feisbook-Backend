const {after, beforeEach, test, describe, before, afterEach} = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const assert = require('node:assert')
 const api = supertest(app)

 const apiURL = '/api/users'

 const account = {
    "name": "Anibru Martinez",
    "email": "eduzz2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}

beforeEach(async()=>{
    await User.deleteMany({})
})

 describe('Users', ()=>{
    test('Retrieving one user', async()=>{
        await api.post(`/api/auth/signup`).send(account).expect(201)
        const loginResponse = await api.post(`/api/auth/login`).send(account).expect(200)
        const response = await api.get(`${apiURL}/me`).set('Authorization', `Bearer ${loginResponse.body.token}`)
        .expect(200)
        assert.ok(response.body.name)
    })
 })

 after(async()=>{
    await mongoose.connection.close()
 })

 
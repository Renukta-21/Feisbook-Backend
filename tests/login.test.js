const { ater, beforeEach, test, describe, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')
const assert = require('node:assert')

const api = supertest(app)
const apiURL = '/api/auth/login'

beforeEach(async () => {
    await User.deleteMany({})
    
})
const account = {
    "name": "Anibru Martinez",
    "email": "eduz2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}

const nonExistingAccount = {
    "name": "Anibru Martinez",
    "email":"eduz211004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}

describe('Login', ()=>{
    test('Account does not exist', async()=>{
        const response = await api.post(apiURL)
        .send(nonExistingAccount)
        .expect(404)

        assert.ok(response.body.error.includes('user not found'))
    })
})

after(async()=>{
    await mongoose.connection.close()
})
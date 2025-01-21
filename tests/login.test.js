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
    "name": "Anibru",
    "surname": "Martinez",
    "email": "eduz2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}

const nonExistingAccount = {
    "email": "eduz211004@gmail.com",
    "password": "Daniel211004"
}

describe('Login', () => {
    test('Account does not exist', async () => {
        const response = await api.post(apiURL)
            .send(nonExistingAccount)
            .expect(404)

        assert.ok(response.body.error.includes('User not found'))
    })

    test('Successful', async () => {
        await api.post('/api/auth/signup')
            .send(account)
            .expect(201)
        /* const response = await api.post(apiURL)
            .send({
                "email": "eduz2111004@gmail.com",
                "password": "Daniel211004",
            })
            .expect(200)
        assert.ok('token' in response.body) */

    })
})

after(async () => {
    await mongoose.connection.close()
})
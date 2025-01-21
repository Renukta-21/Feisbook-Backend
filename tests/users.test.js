const { after, beforeEach, test, describe, afterEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const assert = require('node:assert')
const api = supertest(app)

const apiURL = '/api/users'
const newUserURL = '/api/auth/signup'

const account = {
    "name": "Anibru Martinez",
    "email": "daniel2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}

const accountUpdatedFields = {
    "name": "Daniel Martinez",
    "email": "eduardo2111004@gmail.com",
    "bio": "Just a chill guy"
}
const accounts = [{
    "name": "Anibru Martinez",
    "email": "eduzz2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}, {
    "name": "Daniel Martinez",
    "email": "eduz2111004@gmail.com",
    "password": "edu23423423",
    "bio": "Never expect something better, better things always brings sadder moods"
}]


beforeEach(async () => {
    await User.deleteMany({})
})

let id = []
const insertUsers = async () => {
    for (const account of accounts) {
        const response = await api.post('/api/auth/signup').send(account).expect(201)
        id.push(response.body._id)
    }
}
describe('Users', () => {
    test('Retrieving logged user', async () => {
        await api.post(`/api/auth/signup`).send(account).expect(201)
        const loginResponse = await api.post(`/api/auth/login`).send(account).expect(200)
        const response = await api.get(`${apiURL}/me`).set('Authorization', `Bearer ${loginResponse.body.token}`)
            .expect(200)
        assert.strictEqual(response.body.name, account.name)
    })

    test('Retrieving specific user', async () => {
        await insertUsers()
        const response = await api.get(`${apiURL}/${id[1]}`)
            .expect(200)
        assert.ok(response.body._id)

    })

    test('Retrieving non existing user', async () => {
        await User.findByIdAndDelete(id[0])
        const response = await api.get(`${apiURL}/${id[0]}`)
            .expect(404)
        assert.ok(response.body.error)
    })

    test('Updating specific user', async () => {
        const signupResponse = await api.post(newUserURL).send(account).expect(201)
        const response = await api.put(`${apiURL}/${signupResponse.body._id}`).send(accountUpdatedFields).expect(200)
        console.log(response.body)
    })
})

after(async () => {
    await mongoose.connection.close()
})


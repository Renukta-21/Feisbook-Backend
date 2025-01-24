const { after, beforeEach, test, describe, afterEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const assert = require('node:assert')
const api = supertest(app)

const apiURL = '/api/users'
const newUserURL = '/api/auth/signup'
const loginURL = '/api/auth/login'

const account = {
    "name": "Anibru",
    "surname":"Martinez",
    "email": "daniel2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}
const FriendAccount = {
    "name": "Daniel",
    "surname":"Urbina",
    "email": "eduardourbina@gmail.com",
    "password": "Daniel211004aa",
    "bio": "Just a chull guy x2"
}

const accountUpdatedFields = {
    "name": "Eduardo",
    "surname":"Ramirez",
    "email": "eduardo2111004@gmail.com",
    "bio": "Just a chill guy"
}
const accounts = [{
    "name": "Anibru",
    "surname":"Martinez",
    "email": "eduzz2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}, {
    "name": "Daniel",
    "surname":"Martinez",
    "email": "eduz2111004@gmail.com",
    "password": "edu23423423",
    "bio": "Never expect something better, better things always brings sadder moods"
}]

let loginResponse, signupResponse, loggedUserToken
beforeEach(async () => {
    await User.deleteMany({})
    signupResponse = await api.post(newUserURL).send(account).expect(201)
    loginResponse = await api.post(loginURL).send(account).expect(200)
    loggedUserToken = `Bearer ${loginResponse.body.token}`
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

    test('Updating authenticated user', async () => {
        const response = await api.put(`${apiURL}/me`).set('Authorization', loggedUserToken).send(accountUpdatedFields).expect(200)

        assert.strictEqual(response.body.name, accountUpdatedFields.name, 'Name should be updated');
        assert.strictEqual(response.body.bio, accountUpdatedFields.bio, 'Bio should be updated');

        assert.strictEqual(account.email, response.body.email, 'Email should not be updated');
        assert.strictEqual(response.body._id, signupResponse.body._id, 'ID should not change');
    })

    test('Deleting authenticated user ', async () => {
        const response = await api.delete(`${apiURL}/me`).set('Authorization', loggedUserToken).expect(200)
        assert.ok(response.body.message)
    })

    test('User is able to add new friends', async()=>{
        const newUserResponse = await api.post(newUserURL).send()
    })

})

after(async () => {
    await mongoose.connection.close()
})


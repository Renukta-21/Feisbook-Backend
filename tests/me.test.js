const {describe, test, beforeEach} = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)


const account = {
    "name": "Anibru",
    "surname": "Martinez",
    "email": "daniel2111004@gmail.com",
    "password": "Daniel211004",
    "bio": "Never expect something better, better things always brings sadder moods"
}
const accountUpdatedFields = {
    "name": "Eduardo",
    "surname": "Ramirez",
    "email": "eduardo2111004@gmail.com",
    "bio": "Just a chill guy"
}

const postUserURL = '/api/auth/signup/'
const loginUserURL = '/api/auth/login'
const apiURL = '/api/me'

let loginResponse, signupResponse, loggedUserToken

beforeEach(async()=>{
    await User.deleteMany({})
    signupResponse = await api.post(postUserURL).send(account).expect(201)
    loginResponse = await api.post(loginUserURL).send(account).expect(200)
    loggedUserToken = `Bearer ${loginResponse.body.token}`
})

describe('User actions', ()=>{
    test('Retrieving logged user', async () => {
        const response = await api.get(apiURL).set('Authorization', loggedUserToken)
            .expect(200)
        assert.strictEqual(response.body.name, account.name)
    })

    test('Updating authenticated user', async () => {
        const response = await api.put(apiURL).set('Authorization', loggedUserToken).send(accountUpdatedFields).expect(200)

        assert.strictEqual(response.body.name, accountUpdatedFields.name, 'Name should be updated');
        assert.strictEqual(response.body.bio, accountUpdatedFields.bio, 'Bio should be updated');

        assert.strictEqual(account.email, response.body.email, 'Email should not be updated');
        assert.strictEqual(signupResponse.body._id, response.body._id, 'ID should not change');
    })

    test('Deleting authenticated user ', async () => {
        const response = await api.delete(apiURL).set('Authorization', loggedUserToken).expect(200)
        assert.ok(response.body.message)
    })
    
})
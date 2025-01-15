const { describe, test, after, beforeEach } = require('node:test')
const assert =  require('node:assert')
const supertest = require("supertest");
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

const api = supertest(app)
const apiURL = '/api/auth/signup'

beforeEach(async () => {
    await User.deleteMany({})
})

const validationTests = [
    {
        data: {
            "email": "eduz211004@gmail.com",
            "password": "Daniel211004",
            "bio": "Never expect something better, better things always brings sadder moods"
        },
        missingField:'name'
    },
    {
        data: {
            "name":"Anibru Martinez",
            "password": "Daniel211004",
            "bio": "Never expect something better, better things always brings sadder moods"
        },
        missingField:'email'
    }
]

describe('Sign up', () => {
    test('Fails if property is missing', async () => {
        for(const {data, missingField, expectedMessage} of validationTests){
            const response = await api.post(apiURL)
            .send(data)
            .expect(400)
            assert.ok(response.body.error.includes(`User validation failed: ${missingField}: Path \`${missingField}\` is required.`))
        }
    })
    test('Password does not meet the minimun length or missing', async()=>{
        const response = await api.post(apiURL)
        .send({
            "name":"Anibru Martinez",
            "email":"eduz211004@gmail.com",
            "password": "Daniel"
        })
        .expect(400)
    })
    test('Email already exists', async()=>{
        await api.post(apiURL)
        .send({
            "name":"Eduardo Urbina",
            "email": "eduz211004@gmail.com",
            "password": "Daniel211004",
            "bio": "Never expect something better, better things always brings sadder moods"
        })
        const response = await api.post(apiURL)
        .send({
            "name":"Daniel Urbina",
            "email": "eduz211004@gmail.com",
            "password": "Daniel211004",
            "bio": "Never expect something better, better things always brings sadder moods"
        })
        .expect(409)
        assert.ok(response.body.error.includes('has an existing account'))
    })
})

after(() => {
     mongoose.connection.close()
})

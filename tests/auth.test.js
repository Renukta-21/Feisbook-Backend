const {describe, test, after, beforeEach} = require('node:test')
const supertest = require("supertest");
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

const api = supertest(app)

beforeEach(async()=>{
    await User.deleteMany({}) 
})

describe('Sign up', ()=>{
    test('New account added', async()=>{
        const response = await api.post('/api/auth/signup').send({
            "email":"eduz211004@gmail.com",
            "password":"Daniel211004",
            "bio":"Never expect something better, better things always brings sadder moods"
        })
    .expect(201)
})
})

after(async()=>{
    await mongoose.connection.close()
})

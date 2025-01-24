const {describe, test, beforeEach} = require('node:test')
const User = require('../models/user')

beforeEach(async()=>{
    await User.deleteMany({})
})

describe('User actions', ()=>{
    test('Updating authenticated user', async () => {
        const response = await api.put(`${apiURL}/me`).set('Authorization', loggedUserToken).send(accountUpdatedFields).expect(200)

        assert.strictEqual(response.body.name, accountUpdatedFields.name, 'Name should be updated');
        assert.strictEqual(response.body.bio, accountUpdatedFields.bio, 'Bio should be updated');

        assert.strictEqual(account.email, response.body.email, 'Email should not be updated');
        assert.strictEqual(response.body._id, signupResponse.body._id, 'ID should not change');
    })
})
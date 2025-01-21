const express = require('express');
const docsRouter = express.Router();

docsRouter.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the API Documentation</h1>
        <p>Available routes:</p>
        <ul>
            <li>GET /api/users/me - Get authenticated user data</li>
            <li>GET /api/users/:id - Get a public user profile</li>
            <li>POST /api/auth/login - Login user</li>
            <li>POST /api/auth/signup - Signup new user</li>
        </ul>
    `);
});

module.exports = docsRouter;

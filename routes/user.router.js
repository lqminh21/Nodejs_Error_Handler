const express = require('express');
const router = express.Router();
const {catchErrorWrapperArray} = require('../utils/catchErrorWrapper');

// Define routes
async function mid1(req, res, next) {
    console.log('middleware 1');
    next()
}

async function mid2(req, res, next) {
    console.log('middleware 2');
    throw new APIError();
}

router.get('/users', 
    catchErrorWrapperArray([
        mid1, mid2
    ]),
);

router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Details of user ${userId}`);
});

router.post('/users', (req, res) => {
    res.send('Create a new user');
});

router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Update user ${userId}`);
});

router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Delete user ${userId}`);
});

module.exports = router;
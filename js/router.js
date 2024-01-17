const express = require('express');
const User = require('./user');
const Email = require('./email');
const router = express.Router();
const path = require('path');


router.get('/register', (req, res) => {
    const filePath = path.join(__dirname, '..', 'static', 'register.html');
    res.sendFile(filePath);
});

router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '..', 'static', 'login.html');
    res.sendFile(filePath);
})

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', 'static', 'main.html');
    res.sendFile(filePath);
});

router.get('/settings', (req, res) => {
    const filePath = path.join(__dirname, '..', 'static', 'account-settings.html')
    res.sendFile(filePath)
})


router.post('/register-finish', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).render('username-exist');
        }

        const user = new User({ email, username, password });
        const savedUser = await user.save();
        console.log('User saved:', savedUser);

        res.render('register-successfully', { username });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});

router.post('/login-finish', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {

            return res.status(401).render('invalid-login-data');
        }

        if (user.password === password) {

            res.render('login-successfully', {username});
        } else {

            res.status(401).render('invalid-login-data');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
});

router.post('/email-finish', async (req, res) => {
    const { email: userEmail } = req.body;

    try {
        const newEmail = new Email({ email: userEmail });

        const savedEmail = await newEmail.save();
        console.log('Email saved:', savedEmail);

        res.render('email-successfully', {userEmail});
    } catch (error) {
        console.error('Error saving email:', error);
        res.status(500).send('Error saving email');
    }
});


module.exports = router;
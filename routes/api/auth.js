const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get login user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
    check('login', 'Login jest wymagany!').exists().trim().escape(),
    check('password', 'Hasło jest wymagane!').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { login, password } = req.body;

    try {
        let user = await User.findOne({ login });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Wprowadziłeś nieprawidłowe dane' }] })
        }

        const isMath = await bcrypt.compare(password, user.password);

        if (!isMath) {
            return res.status(400).json({ errors: [{ msg: 'Wprowadziłeś nieprawidłowe dane' }] })
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/deleteAccount
// @desc    Delete Account
// @access  Private
router.post('/deleteAccount', [auth, [
    check('password', 'Wprowadź hasło').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id);
        const isMath = await bcrypt.compare(req.body.password, user.password);

        if (!isMath) {
            return res.status(400).json({ errors: [{ msg: 'Nieprawiedłowe hasło' }] })
        }

        user.delete();

        res.json({ msg: 'Konto zostało usunięte' });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}]);

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// Users colors
const userColors = [
    '#b71c1c', '#c62828', '#d32f2f', '#880e4f', '#d50000', '#ad1457', '#c2185b', '#c51162', '#aa00ff', '#4a148c', '#6a1b9a', '#7b1fa2', '#6200ea', '#311b92', '#4527a0', '#512da8', '#304ffe', '#1a237e', '#283593', '#303f9f', '#2962ff', '#0d47a1', '#1565c0', '#1976d2', '#0091ea', '#01579b', '#0277bd', '#0288d1', '#00b8d4', '#006064', '#00838f', '#0097a7', '#00bfa5', '#004d40', '#00695c', '#00796b', '#00c853', '#1b5e20', '#2e7d32', '#388e3c', '#64dd17', '#33691e', '#558b2f', '#689f38', '#aeea00', '#827717', '#9e9d24', '#afb42b', '#aeea00', '#f57f17', '#f9a825', '#ff6f00', '#ff8f00', '#ffab00', '#e65100', '#ff6d00', '#ef6c00', '#bf360c', '#dd2c00', '#d84315', '#3e2723', '#4e342e', '#5d4037',
];

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [
    check('login', 'Login musi zawierać od 6 do 16 znaków').isLength({ min: 6, max: 16 }).trim().escape(),
    check('name', 'Wprowadź Imię i Nazwisko').not().isEmpty().escape(),
    check('email', 'Podaj prawidłowy adres E-mail').isEmail(),
    check('password', 'Hasło musi zawierać od 6 do 16 znaków').isLength({ min: 6, max: 16 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { login, name, email, password, year, regulations } = req.body;

    try {
        if (!year) {
            return res.status(400).json({ errors: [{ msg: 'Musisz mieć ukończone 18 lat aby założyć konto' }] });
        }

        if (!regulations) {
            return res.status(400).json({ errors: [{ msg: 'Musisz zaakceptować warunki korzystania z serwisu' }] });
        }

        let userLogin = await User.findOne({ login });
        let userMail = await User.findOne({ email });

        if (userLogin && userMail) {
            return res.status(400).json({ errors: [{ msg: 'Login i E-mail są już w użyciu' }] });
        }
        else if (userLogin) {
            return res.status(400).json({ errors: [{ msg: 'Podany Login jest już w użyciu' }] });
        }
        else if (userMail) {
            return res.status(400).json({ errors: [{ msg: 'Podany E-mail jest już w użyciu' }] });
        }

        const user = new User({
            login,
            name,
            email,
            password,
            color: userColors[Math.floor(Math.random() * userColors.length)],
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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

// @route   POST api/users/nick
// @desc    Create user nick
// @access  Private
router.post('/nick', [auth, [
    check('nick', 'Nick musi zawierać od 3 do 10 znaków').isLength({ min: 4, max: 10 }).trim().escape(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { nick } = req.body;

    try {
        const isUsed = await User.findOne({ nick }).select('-password');
        if (isUsed) {
            return res.status(400).json({ errors: [{ msg: 'Ten nick jest już zajęty' }] })
        }

        const user = await User.findById(req.user.id).select('-password');
        user.nick = nick;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   PUT api/users
// @desc    Update user data
// @access  Private
router.put('/', [auth, [
    check('name', 'Wprowadź Imię i Nazwisko').not().isEmpty().escape(),
    check('email', 'Podaj prawidłowy adres E-mail').isEmail(),
    check('nick', 'Nick musi zawierać od 3 do 10 znaków').isLength({ min: 4, max: 10 }).trim().escape(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { nick, email, name } = req.body;

    try {
        const user = await User.findById(req.user.id).select('-password');
        let isUsedNick = await User.findOne({ nick });
        let isUsedEmail = await User.findOne({ email });

        if (!isUsedNick || (isUsedNick && nick === user.nick)) {
            isUsedNick = false
        } else {
            isUsedNick = true;
        }
        if (!isUsedEmail || (isUsedEmail && email === user.email)) {
            isUsedEmail = false
        } else {
            isUsedEmail = true;
        }

        if (isUsedNick && isUsedEmail) {
            return res.status(400).json({ errors: [{ msg: 'Nick i Email są już zajęte' }] })
        }
        else if (isUsedNick) {
            return res.status(400).json({ errors: [{ msg: 'Ten nick jest już zajęty' }] })
        }
        else if (isUsedEmail) {
            return res.status(400).json({ errors: [{ msg: 'Ten email jest już zajęty' }] })
        }

        user.nick = nick;
        user.email = email;
        user.name = name;

        user.save()
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/users/password
// @desc    Change user password
// @access  Private
router.post('/password', [auth, [
    check('password', 'Wprowadź aktualne hasło').exists(),
    check('newPassword', 'Nowe hasło musi zawierać od 6 do 16 znaków').isLength({ min: 6, max: 16 }),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { password, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        const isMath = await bcrypt.compare(password, user.password);

        if (!isMath) {
            return res.status(400).json({ errors: [{ msg: 'Wprowadziłeś błędnie aktualne hasło' }] });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(newPassword, salt);


        user.save()
        res.json({ msg: 'Hasło zmienione pomyślnie' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/users/coins
// @desc    Add coins to account
// @access  Private
router.post('/coins', auth, async (req, res) => {
    const coins = req.body.coins;

    try {
        const user = await User.findById(req.user.id);
        user.luckycoins += coins;

        user.save();
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/users/
// @desc    Refresh User
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
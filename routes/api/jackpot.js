const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Jackpot = require('../../models/Jackpot');

// @route   GET api/jackpot
// @desc    get games history
// @access  Public
router.get('/', async (req, res) => {
    try {
        const lastGames = await Jackpot.find({ current: false }).sort({ _id: -1 }).limit(5);

        res.json(lastGames);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/jackpot
// @desc    Post bet
// @access  Private
router.post('/', [auth, [
    check('luckycoins', 'Wprowadź prawidłową liczbę').isInt()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { luckycoins } = req.body;

    try {
        if (luckycoins <= 0) {
            return res.status(400).json({ errors: [{ msg: 'Wprowadź prawidłową liczbę' }] });
        }

        const user = await User.findById(req.user.id).select('-password');
        const jackpot = await Jackpot.findOne({ current: true });

        if (user.luckycoins < luckycoins) {
            return res.status(401).json({ errors: [{ msg: 'Nie posiadasz tyle Luckycoins!' }] });
        }
        user.luckycoins -= Number(luckycoins);
        await user.save();

        if (jackpot) {
            const isInGame = jackpot.players.filter(player => player.userId == user.id);
            jackpot.cash += Number(luckycoins);
            if (!isInGame.length) jackpot.players.push({ userId: user.id, cash: Number(luckycoins) });
            else {
                jackpot.players.map(player => player.userId == user.id ? player.cash += Number(luckycoins) : player);
            }
            await jackpot.save();
            return res.json(user);
        }

        const newJackpot = new Jackpot({
            cash: Number(luckycoins),
            current: true,
            players: [{ userId: user.id, cash: Number(luckycoins) }]
        });

        await newJackpot.save();
        return res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
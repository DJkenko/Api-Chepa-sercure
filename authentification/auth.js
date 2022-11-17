const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

router.use(bodyParser.json());

let refreshTokens = [];

router.route("/authentication").post('/login', (req, res) => {
    // read userame and password from req body
    const { username, password } = req.body;

    // filter user from DB by username and password
    const user = null;

    if (user) {
        // generate access token
        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '20m'});
        const refreshToken = jwt.sign({ username: user.username}, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

router.route("/authentication").post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

router.route("/authentication").post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
});
require('dotenv').config();
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: 'Kelvin',
        title: 'Post 1'
    },
    {
        username: 'Jane',
        title: 'Post 45'
    },
    {
        username: 'James',
        title: 'Post 6'
    }
]

// main page
app.get('/', (req, res) => {
    res.send('Node js - Json Web Token - Authentication');
});

// get all posts
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

// login user
app.post('/login', (req, res) => {
    // Authenticate User

    // Create JWT
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

// auth middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // if we have a token, we split it and get the second part
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000);
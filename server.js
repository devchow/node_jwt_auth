const express = require('express');
const app = express();

const posts = [
    {
        username: 'Kelvin',
        title: 'Post 1'
    },
    {
        username: 'Jane',
        title: 'Post 45'
    }
]

app.get('/', (req, res) => {
    res.send('Node js - Json Web Token - Authentication');
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.listen(3000);
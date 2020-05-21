const express = require('express');
const randomString = require('randomstring');
const queryString = require('query-string');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
require('dotenv').config();

// Variables for Express
const app = express();
const port = process.env.PORT || 5000;

// Variables for the Spotify API
const clientID = process.env.API_CLIENT_ID;
const clientSecret = process.env.API_CLIENT_SECRET;
const redirectURI = 'https://spotify-habits.herokuapp.com/callback'

const random = randomString.generate(16);

app.use(cors())
app.use(cookieParser())

app.get('/redirect', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
        response_type: 'code',
        client_id: clientID,
        scope: 'user-read-email user-read-private user-top-read',
        redirect_uri: redirectURI,
        state: random
    }))
})

app.get('/callback', (req, res) => {
    const code = req.query.code;
    if(code){
        axios({
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            data: queryString.stringify({
                code: code,
                redirect_uri: redirectURI,
                grant_type: 'authorization_code',
                client_id: clientID,
                client_secret: clientSecret
            }),
            url: 'https://accounts.spotify.com/api/token'
        })
        .then(response => {
            res.cookie('access_token', response.data.access_token)
            res.redirect('https://spotify-habits.herokuapp.com/userData')

        })
        .catch(err => res.json(err))
    } else {
        res.send({msg: "NO CODE"})
    }
})

app.get('/data', (req, res) => {
    axios({
        method: "GET",
        headers: {'Authorization': `Bearer ${req.headers.token}`},
        url: `https://api.spotify.com/v1/me/top/${req.headers.type}?` + queryString.stringify({time_range: req.headers.range, limit: 50})
    })
    .then(response => res.json(response.data))
    .catch(err => res.json(err))
})

app.get('/profile', (req, res) => {
    axios({
        method: "GET",
        headers: {'Authorization': `Bearer ${req.headers.token}`},
        url: `https://api.spotify.com/v1/me`
    })
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        res.json(err)
    })
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(port, () => console.log(`Server started on ${port}`))
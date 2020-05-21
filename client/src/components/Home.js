import React from 'react';

function getData() {
  window.location.href = "https://spotify-habits.herokuapp.com/redirect"
}

export default function Home() {
  return (
    <div id="login">
        <img id="spotifyLogo" src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"/>
        <h1 className="center">Spotify Listening Habits</h1>
        <p className="center">Check out your top tracks and artists</p>
        <button onClick={getData}>Log In with Spotify</button>
    </div>
  );
}
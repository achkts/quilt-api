const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const SECRET_KEY = process.env.JWT_SECRET_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.HOST_AND_SCHEMA + '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('callback', accessToken, refreshToken, profile)
      // Code to handle user authentication and retrieval
      done(null, {name: profile.displayName, email: profile.emails[0].value});
    }
  )
);

passport.serializeUser((user, done) => {
  // Code to serialize user data
  console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  // Code to deserialize user data
  console.log('deserializeUser', id);
  done(null, {name: id, email: id});
});

router.get('/test', (req, res) => {
  res.send('Auth route working');
});

// Initiates the Google OAuth 2.0 authentication flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL for handling the OAuth 2.0 response
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect or handle the user as desired
    console.log('success login')
    // res.send('success login');
    console.log('what is the user?',req)
    const token = jwt.sign({ username: req.user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});



// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
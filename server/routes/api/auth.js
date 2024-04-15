const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtTokens } = require('../../utilities/jwtHelpers.js');

const dbUsername = require("../../config/keys").dbUsername;
const dbPassword = require("../../config/keys").dbPassword;

const { Pool } = require("pg");
const pool = new Pool({
  user: dbUsername,
  host: "localhost",
  database: "color-picker",
  password: dbPassword,
  port: 5432
});


router.post('/login', async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const users = await pool.query('SELECT * FROM users WHERE user_name = $1', [userName]);
    if (users.rows.length === 0) return res.status(401).json({ error: "username is incorrect" });
    //PASSWORD CHECK
    const validPassword = await bcrypt.compare(userPassword, users.rows[0].user_password);
    if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
    //JWT
    let tokens = jwtTokens(users.rows[0]);//Gets access and refresh tokens
    res.cookie('refresh_token', tokens.refreshToken, { ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }), httpOnly: true, sameSite: 'none', secure: true });
    res.json({
      // user: users.rows[0],
      ...tokens
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }

});

router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log(req.cookies);
    if (refreshToken === null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      let tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, { ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }), httpOnly: true, sameSite: 'none', secure: true });
      return res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete('/refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({ message: 'Refresh token deleted.' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
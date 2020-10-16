'use strict';

const express = require('express');
const router = express.Router();

// Index page
router.get('/', (req, res) => {
  res.render('index', { err: false, data: 'Hello world' });
});

// Unmatched routes
router.use((req, res) => {
  res.resolve('Unknown route');
});

module.exports = router;

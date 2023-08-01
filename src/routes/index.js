const express = require('express');
const router = express.Router();

const {
  getIndex,
  urltransform,
  urlRedirect,
} = require('../controllers/urlController');

router.get('/', getIndex);

router.post('/transform', urltransform);

router.get('/:shortenUrl', urlRedirect);

module.exports = router;

const fs = require('fs');
const urls = require('../models/urls');

function findUrl(url) {
  for (const key in urls) {
    if (urls[key] === url) {
      return key;
    }
  }
  return false;
}

function generateRandomCode() {
  let randomCode = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  do {
    // check if generated code is existed or not
    for (let i = 0; i < 5; i++) {
      randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (urls.hasOwnProperty(randomCode));
  return randomCode;
}

function updateUrl(code, url) {
  urls[code] = url;
  fs.writeFile('./src/models/urls.json', JSON.stringify(urls), () => {});
}

async function checkUrlIsOk(url) {
  const regex = new RegExp('^(https|http)://*.');
  return regex.test(url);
}
// controllers
const getIndex = (req, res) => {
  res.render('index');
};

const urltransform = async (req, res) => {
  const baseURL = 'http://localhost:3000/';
  const url = req.body.url;
  let code = '';
  // check url is ok
  const isOk = await checkUrlIsOk(url);
  if (!isOk) {
    res.render('error', { error: "The URL couldn't be connected!" });
  } else {
    // check url is existed or not
    code = findUrl(url);
    if (!code) {
      // else generate random code
      code = generateRandomCode();
      // record new code and return
      updateUrl(code, url);
    }
    res.render('transform', {
      shortenUrl: baseURL + code,
      message: 'Success! Please use this link: ',
    });
  }
};

const urlRedirect = (req, res) => {
  const code = req.params.shortenUrl;
  const url = urls[code];
  if (url) {
    res.redirect(url);
  } else {
    res.render('error', { error: 'The URL is not found' });
  }
};

module.exports = {
  getIndex,
  urltransform,
  urlRedirect,
};

const express = require('express');
const router = express.Router();

const { getUrls, createUrls, goToUrl } = require('../controller')

router.route("/urls").get(getUrls);

router.route('/shortUrls').post(createUrls);

router.route('/urls/:shortUrl').get(goToUrl);



module.exports = router

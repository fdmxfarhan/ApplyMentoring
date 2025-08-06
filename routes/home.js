var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const sms = require('../config/sms');
const { countries } = require('../config/consts');

router.get('/', (req, res, next) => {
    res.render('./home', { 
        user: req.user ,
        countries,
    });
});

router.post('/consultation', (req, res) => {
    var {country, service, fullname, phone} = req.body;
    sms('+989363086017', 'کشور: ' + country + '\nخدمات: ' + service + '\nنام و نام خانوادگی: ' + fullname + '\nشماره تماس: ' + phone);

    res.send('done!')
});

module.exports = router;
var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const sms = require('../config/sms');
const { countries, workCountries } = require('../config/consts');
const mail = require('../config/mail');
const StudyPost = require('../models/StudyPost');

// sms('09363086017', 'سلام وقتتون بخیر 🙌\n\nاگر به مهاجرت تحصیلی 🎓، کاری 👷‍♂️، توریستی ✈️ یا اوسبیلدونگ در آلمان علاقه‌مند هستید، مجموعه‌ی Applymentoring از مشاوره تخصصی اولیه تا منتورینگ و اقدام کامل (صفر تا صد) همراه شماست.\n\n✅ بررسی شرایط و انتخاب بهترین مسیر مهاجرت\n✅ راهنمایی تخصصی برای ویزای تحصیلی، کاری و توریستی\n✅ پشتیبانی و منتورینگ در تمامی مراحل\n✅ تجربه موفق با ده‌ها پرونده موفق مهاجرتی\n\n📩 ایمیل: info.applymentoring@gmail.com\n📱 واتساپ: 09192174104\n\nجهت دریافت مشاوره اولیه، همین حالا با ما در ارتباط باشید!\nمهاجرت هوشمندانه را با Applymentoring تجربه کنید ✨')
// mail('fdmxfarhan@yahoo.com', 'test', 'salam')

router.get('/', (req, res, next) => {
    res.render('./home', { 
        user: req.user ,
        countries,
        workCountries,
    });
});

router.post('/consultation', (req, res) => {
    var {country, service, fullname, phone} = req.body;
    sms('+989363086017', 'کشور: ' + country + '\nخدمات: ' + service + '\nنام و نام خانوادگی: ' + fullname + '\nشماره تماس: ' + phone);
    mail('rezaestaji80@gmail.com', 'درخواست مشاوره جدید', 'کشور: ' + country + '\nخدمات: ' + service + '\nنام و نام خانوادگی: ' + fullname + '\nشماره تماس: ' + phone);
    res.send('done!')
});

router.get('/study-imigration', (req, res) => {
    var {countryID, countryName} = req.query;
    StudyPost.findOne({countryID}, (err, studyPost) => {
        res.render('./pages/study-imigration', {
            user: req.user,
            countries,
            workCountries,
            countryID,
            countryName,
            studyPost,
        });
    })    
});
router.get('/edit-study-imigration', ensureAuthenticated, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    var {countryID, countryName} = req.query;
    console.log(countryID, countryName);
    StudyPost.findOne({countryID}, (err, studyPost) => {
        console.log(studyPost)
        if(studyPost){
            res.render('./pages/edit-study-imigration', {
                user: req.user,
                countries,
                workCountries,
                countryID,
                countryName,
                studyPost,
            });
        }
        else{
            var newStudyPost = new StudyPost({
                countryID,
                countryName,
                content: '',
            })
            console.log(newStudyPost)
            newStudyPost.save().then(doc => {
                res.render('./pages/edit-study-imigration', {
                    user: req.user,
                    countries,
                    workCountries,
                    countryID,
                    countryName,
                    studyPost: newStudyPost,
                });
            }).catch(err => console.log(err));
        }
    })    
});
router.post('/update-study-imigration', ensureAuthenticated, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    var {countryID, countryName, content} = req.body;
    StudyPost.updateMany({countryID}, {$set: {content}}, (err, doc) => {
        req.flash('success_msg', 'تغییرات با موفقیت ثبت شد')
        res.redirect(`/study-imigration?countryID=${countryID}&countryName=${countryName}`);
    });
});

module.exports = router;
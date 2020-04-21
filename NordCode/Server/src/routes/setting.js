const express = require('express');
const nodemailer = require("nodemailer");
const Setting = require('../models/Setting.js');

const router = express.Router();
router.get('/getsettingall', (req, res, next) => {
    var name = req.query.Name;
    console.log('Test Name: ' + name)
    Setting.findAll().then(setting => {
        res.json({
            status: true,
            msg: 'Data loaded successfully',
            setting: setting
        });
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    //let Setter;
    Setting.findAll({ where: { Active: 1, GID: 1000 } }).then(setting => {

        if (setting.length == 0) {
            setting.GText = 'gmsanzid@gmail.com';
            setting.Text = 'GM3#sanzid';
        }
        sendMail(user, setting, (err, info) => {
            if (err) {
                console.log(err);
                res.status(400);
                res.send({ error: "Failed to send email" });
            } else {
                console.log("Email has been sent");
                res.send(info);
            }
        });
    });
});
const sendMail = (user, setting, callback) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: setting[0].GText,
            pass: setting[0].Text
        }
    });
    const mailOptions = {
        from: `${user.Name}, ${user.Email}`,
        to: `<${setting[0].GText}>`,
        subject: `${user.TONumber}`,
        html: `${user.Message}`
    };
    transporter.sendMail(mailOptions, callback);
}

module.exports = router;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const forgot = async(req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.send({ Status: "User not existed" });
        }
        const token = jwt.sign({ id: user._id}, "jwt_secret_key", { expiresIn: "1d" });
        const transporter = nodemailer.createTransport(
            {
                service: 'Gmail',
                auth: {
                    user: 'swampysellsuf@gmail.com',
                    pass: process.env.GMAIL_PASSWORD
                }
            }
        );
        const mailOptions = {
            from: 'swampysellsuf@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/reset/${user._id}/${token}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).send('Failed to send verification email')
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send('Verification email sent');
            }
          });
    })
};

const reset = async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body
    console.log('New Password', password)

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
          return res.json({ Status: "Error with token" })
        } else {
          bcrypt.hash(password, 12)
            .then(hash => {
              User.findByIdAndUpdate({ _id: id }, { password: hash })
                .then(u => res.send({ Status: "Success" }))
                .catch(err => res.send({ Status: err }))
            })
            .catch(err => res.send({ Status: err }))
        }
      })
}

module.exports = { forgot, reset };
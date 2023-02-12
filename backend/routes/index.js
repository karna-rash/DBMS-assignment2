import express from 'express';
import User from '../models/users.js'
import jwt from 'jsonwebtoken'

const app = express();

const router = express.Router();


// Authentication Routes
router.post('/login', async (req, res) => {
  console.log(req.body);
  let users = await User.find({ username: req.body.userName }); //change this according to postgres
  if (users.length == 0) {
    res.sendStatus(406).json({ logRes: -1 });
  }
  else {
    let user = users[0];
    if (user.password == req.body.pass) {

      jwt.sign({
        username: user.username,
        email: user.email,
        password: user.password
      }, process.env.SECRET_KEY, (err, token) => {
        if (err) { console.log(err); }
        res.json({
          token: token,
          logRes: 1,
          role:user.role,
        })
      })
    }

    else {
      res.json({ logRes: -2 });
    }
  }
});

app.post('/register',async (req, res) => {
  console.log(req.body)
  let user = await User.find({ username: req.body.userName });
  console.log
  if (user.length == 0) {

    let otpuser = new Otp(
      {
        username: req.body.userName,
        email: req.body.email,
        password: req.body.pass,
        otp: lodash.random(99999, 1000000),
      });
    await otpuser.save().then((result) => { console.log(result) }).catch((err) => console.log(err));

    //sending otp

    mailoptions.text = 'Your 6 digit OTP is ' + otpuser.otp;
    mailoptions.to = req.body.email;
    transporter.sendMail(mailoptions, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('email sent');
      }

    })
    res.json({ regRes: 1 });
  }

  });


export default router;
import express from 'express';
import User from '../models/users.js'

const app = express();

const router = express.Router();


// Authentication Routes
router.post('/login', async (req, res) => {
  console.log(req.body);
  let users = await User.find({ username: req.body.userName });
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


export default router;
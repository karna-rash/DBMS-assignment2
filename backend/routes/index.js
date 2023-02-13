import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({path: __dirname+'../.env' });
const app = express();

const router = express.Router();


// Authentication Routes
router.post('/login', async (req, res) => {
  console.log(req.body);
  // let users = await User.find({ username: req.body.userName }); //change this according to postgres
  // if (users.length == 0) {
  //   res.sendStatus(406).json({ logRes: -1 });
  // }
  // else {
  //   let user = users[0];
  //   if (user.password == req.body.pass) {

  //     jwt.sign({
  //       username: user.username,
  //       email: user.email,
  //       password: user.password
  //     }, process.env.SECRET_KEY, (err, token) => {
  //       if (err) { console.log(err); }
  //       res.json({
  //         token: token,
  //         logRes: 1,
  //         role:user.role,
  //       })
  //     })
  //   }

  //   else {
  //     res.json({ logRes: -2 });
  //   }
  // }
  res.json(
    {
      req:req.body
    })
});

router.post('/register',async (req, res) => {
  console.log(req.body)
  const query = {
    name: 'fetch-user',
    text: 'SELECT count(username) FROM users WHERE username = $1',
    values: [req.body.userName],
  }

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      if(res.rows[0]==0){
        const query = {
          text: 'insert into users values ($1,$2,$3)',
          values: [req.body.userName,req.body.password,req.body.display_name],
        }
        client.query(query, (err, res) => {
          if (err) {
            console.log(err.stack)
          }
        })
      }
      else{
        
      }
    }
  })
  });


export default router;
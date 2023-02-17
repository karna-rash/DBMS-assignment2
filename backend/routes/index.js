import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import client from '../config/conn.js'
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
      logRes:1
    })
});

router.post('/register',async (req, res) => {
  console.log(req.body)
  const query = {
    name: 'fetch-user',
    text: 'SELECT count(username) FROM users WHERE username = $1',
    values: [req.body.userName],
  }
 
  client.query(query, (err, resl) => {
    if (err) { 
      console.log(err.stack)
    } else {
      
      if(resl.rows[0].count==0){
        const query = {
          text: 'insert into users values ($1,$2,$3)',
          values: [req.body.userName,req.body.password,req.body.displayName],
        }
        client.query(query, (err, resl) => {
          if (err) {
            console.log(err.stack)
          }
        })
        res.json({
          regRes:1
        })
      }
      else{
        res.json({
          regRes:-1
        })
      }
    }
  })
  });

  router.get('/tags',(req,res)=>
  {
    const query = {
      name: 'fetch-tags',
      text: 'SELECT * FROM tags',
      values: [],
    }
     client.query(query, (err, resl) => {
          if (err) {
            console.log(err.stack)
          }
          else
          {
            res.json({
              tags:resl.rows
            })
          }
        })
        
  });

  router.get('/users',(req,res)=>
  {
    const query = {
      text: "SELECT username FROM users where username like '%%"+req.body.userName+"%%'",
      values: [],
    }
     client.query(query, (err, resl) => {
          if (err) {
            console.log(err.stack)
          }
          else
          { console.log(resl.rows)
            res.json({
              users:resl.rows
            })
          }
        })
  });

  router.get('/posts/tag/:id1/:id2',(req,res)=>
{
    let tag = req.params.id1; 
    let pagenum = req.params.id2;
    
})

  router.get('/posts/tag/:id',(req,res)=>
  {
     let tag = req.params.id; console.log(tag)
     const query1 = {
      text: "SELECT * FROM posts where tags like '%%"+tag+"%%' order by id limit 10",
      values: [],
    }
    let posts=[];
    const query2 = {
      text: "SELECT id FROM posts where tags like '%%"+tag+"%%'",
      values: [],
    }
     client.query(query1, (err, resl) => {
          if (err) {
            console.log(err.stack)
          }
          else
          { console.log(resl.rows)
            posts=resl.rows;
          }
        })
        client.query(query2, (err, resl) => {
          if (err) {
            console.log(err.stack)
          }
          else
          { console.log(resl.rowCount)
            res.json({
              posts:posts,
              totpage:resl.rowCount/10
            })
          }
        })
          
  });


export default router;
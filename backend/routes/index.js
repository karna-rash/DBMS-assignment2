import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import client from '../config/conn.js'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({path: __dirname+'../.env' });
const app = express();

const router = express.Router();

function authenticateToken(req, res, next) {

  const bearer = req.headers['authorization'];
  const token = bearer && bearer.split(' ')[1];
  if (token == null) {
    res.json({ tokenStatus: -1 });
    
  }
  else {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.json({ tokenStatus: -2 });
      }
      else {
        console.log(user)

        next();
      }
    })
  }
  next();
};

router.get('/test',authenticateToken,(req,res)=>
{
   res.json({ok:1});
})

// Authentication Routes
router.post('/login', async (req, res) => {
  
  const query = {
    name: 'fetch-user',
    text: 'SELECT * FROM users WHERE username = $1',
    values: [req.body.userName],
  }

  client.query(query, (err, resl) => {
    if (err) { 
      console.log(err.stack)
    } 
    else 
    {
      
      if(resl.rows.length == 0)
      {
    res.json({ logRes: -1 });
      }
    else 
     {
    if (resl.rows[0].password == req.body.password) {

      jwt.sign({
        userName: resl.rows[0].username,
      }, process.env.SECRET_KEY, (err, token) => {
        if (err) { console.log(err); }
        res.json(
          {
          token: token,
          logRes: 1,
          })
      })
    }

     else 
      {
      res.json({ logRes: -2 });
       }
    }
  }
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
    const query={
      text: "(SELECT * FROM posts where tags like '%%<"+tag+">%%' order by creation_date limit "+pagenum*8+" ) except (SELECT * FROM posts where tags like '%%<"+tag+">%%' order by creation_date limit "+(pagenum-1)*8 +");",
      values: [],
    }
    client.query(query, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { console.log(resl.rows)
        console.log(resl.rowCount)
        res.json({
          posts:resl.rows
        })
      }
    })
    
    
})
//answers
router.get('/posts/:id1',(req,res)=>
{
    let post_id = req.params.id1; 
    const query={
      text: "SELECT * FROM answers where post_id = '"+post_id+"' order by creation_date ",
      values: [],
    }
    client.query(query, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { console.log(resl.rows)
        console.log(resl.rowCount)
        res.json({
          answers:resl.rows
        })
      }
    })
    
    
})

  router.get('/posts/tag/:id',(req,res)=>
  {
     let tag = req.params.id; console.log(tag)
     const query1 = {
      text: "SELECT * FROM posts where tags like '%%<"+tag+">%%' order by creation_date limit 8",
      values: [],
    }
    let posts=[];
    const query2 = {
      text: "SELECT id FROM posts where tags like '%%<"+tag+">%%'",
      values: [],
    }
    let rowCount=0;
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
            console.log(Math.ceil(resl.rowCount/8))

            res.json({
              posts:posts,
              totpage:Math.ceil(resl.rowCount/8)
            })
          }
        })
          
  });


export default router;
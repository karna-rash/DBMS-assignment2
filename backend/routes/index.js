import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import client from '../config/database.js'
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
        req.user=user
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


//by abhinay
router.post('/create_post',authenticateToken,(req,res)=>
{
  
    const ownerid=req.user.userid;
    const Ownername=req.user.userName;
    const post_title=req.body.title;
    const post_body= req.body.body;
    const tags=req.body.tags;
    const creation_date=req.body.creation_date;

    res.json({
      ok:1,
      user:req.user,
      data:req.body
       });

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
        userid:resl.rows[0].id
      }, process.env.SECRET_KEY, (err, token) => {
        if (err) { console.log(err); }
        res.json(
          {
          userid:resl.rows[0].id,
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
        console.log(req.body.userName)
        console.log(req.body.password)
        console.log(req.body.displayName)
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

  router.post('/users',(req,res)=>
  { 
    const query = {
      text: "SELECT id,username FROM users where username like '%%"+req.body.userName+"%%'",
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

  router.get('/posts/user/:id',(req,res)=>
  {
     let userid = req.params.id; 
     console.log(userid,'here')
     const query1 = {
      text: "SELECT * FROM posts where owner_id ="+userid+ " order by creation_date limit 8",
      values: [],
    }
    let posts=[];
    const query2 = {
      text: "SELECT id FROM posts where owner_id ="+userid,
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
//searching 
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

//searching posts of page 1 from tags
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
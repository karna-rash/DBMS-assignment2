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
        req.user=user
        next();
      }
    })
  }

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
    //console.log(req)
    //const tags=req.body.tags;
    let tag =[req.body.tags.length];
    for(let i=0;i<req.body.tags.length;i++){
      tag[i]="<"+req.body.tags[i]+">";
    }
    let tagstring="";
    for(let j=0;j<req.body.tags.length;j++){
      tagstring=tagstring+tag[j];
    }
    //console.log(tagstring);
    const creation_date=new Date(Date.now());
    let time =creation_date.toISOString();
    //console.log(req.body)
       
       const query={
        text: 'insert into posts(id,Owner_id ,OwnerName,Title ,tags , body ,creation_date) values ($1,$2,$3,$4,$5,$6,$7)',
        values: [++maxpostid,ownerid,Ownername,post_title,tagstring,post_body,time],
      }
      client.query(query, (err, resl) => {
        if (err) {
          console.log(err.stack)
          res.json(
            {
             tokenStatus:1,
             postRes:-1
            });
        }
        else
        { 
          //console.log(resl.rows)
          console.log("added post");
           res.json(
           {
            tokenStatus:1,
            postRes:1
           });
           
        }
      })
})

router.post('/create_answer',authenticateToken,(req,res)=>
{
  
    const ownerid=req.user.userid;
    const Ownername=req.user.userName;
    const postid=req.body.postid;
    const body= req.body.body;
    //console.log(req)
    //const tags=req.body.tags;
    
    //console.log(tagstring);
    const creation_date=new Date(Date.now());
    let time =creation_date.toISOString();
    //console.log(req.body)
       
       const query={
        text: 'insert into answers(id,answeredby_id,OwnerName, post_id, body ,creation_date) values ($1,$2,$3,$4,$5,$6)',
        values: [++maxansid,ownerid,Ownername,postid,body,time],
      }
      const q1={
        text: 'update posts set answercount=answercount+1 where id='+postid
      }
      client.query(query, (err, resl) => {
        if (err) {
          console.log(err.stack)
          res.json(
            {
             tokenStatus:1,
             postRes:-1
            });
        }
        else
        { 

          client.query(q1,(err,resll)=>{
            if(err){
              console.log(err.stack)
            }
            else{
              console.log('ok');
            }
          });
          //console.log(resl.rows)
          console.log("added post");
           res.json(
           {
            tokenStatus:1,
            postRes:1
           });
           
        }
      })
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

router.post('/login/posts',authenticateToken,(req,res)=>{
  const ownerid=req.user.userid;
  const query={
    text: 'select * from posts where Owner_id = $1 order by creation_date desc',
    values: [ownerid],
  }
  console.log(ownerid);
  client.query(query, (err, resl) => {
    if (err) {
      console.log(err.stack)
    }
    else
    { 
      res.json(
        {
         posts: resl.rows
        });
    }
  })
});

let maxuserid=0;let maxpostid=0;let maxansid=0;
const q1={
text : 'select id from users order by id desc limit 1'
}
client.query(q1, (err, resl) => {
  if (err) {
    console.log(err.stack)
  }
  else
  { 
    maxuserid=resl.rows[0].id
  }
})
const q2={
  text : 'select id from posts order by id desc limit 1'
  }
  client.query(q2, (err, resl) => {
    if (err) {
      console.log(err.stack)
    }
    else
    { 
      maxpostid=resl.rows[0].id
    }
  })

  const q3={
    text : 'select id from answers order by id desc limit 1'
    }
    client.query(q3, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { 
        maxansid =resl.rows[0].id
      }
    })
    
router.post('/register',async (req, res) => {
  console.log(req.body)
  const query = {
    name: 'fetch-user-count',
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
        console.log(req.body.dispName)
        const query = {
          text: 'insert into users(id,username,password,display_name) values ($1,$2,$3,$4)',
          values: [++maxuserid,req.body.userName,req.body.password,req.body.dispName],
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

  router.post('/posts/user/:id',(req,res)=>
  {
     let userid = req.params.id; 
     let flg=req.body.filter;
     console.log(userid,'here')
     let query1;
     if(flg=='latest'){
      query1 = {
        text: "SELECT * FROM posts where owner_id ="+userid+ " order by creation_date desc limit 8",
        values: [],
      }
     }
     else if(flg=='oldest'){
      query1 = {
        text: "SELECT * FROM posts where owner_id ="+userid+ " order by creation_date limit 8",
        values: [],
      }
     }
     else{
      query1 = {
        text: "SELECT * FROM posts where owner_id ="+userid+ " order by up_votes desc limit 8",
        values: [],
      }
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

 router.post('/posts/multiple_tags',(req,res)=>
 {
    console.log(req.body);
    let tag =[5];
    for(let i=0;i<req.body.tags.length;i++){
      tag[i]="<"+req.body.tags[i]+">";
    }
    for(let i=req.body.tags.length;i<5;i++){
      tag[i]="";
    }
    const query1={
      text: "(SELECT * FROM posts where tags like '%%"+tag[0]+"%%' and tags like '%%"+tag[1]+"%%' and tags like '%%"+tag[2]+"%%' and tags like '%%"+tag[3]+"%%' and tags like '%%"+tag[4]+"%%' order by creation_date limit 8)",
      values: [],
    }
    let pageCount=0;
    const query2={
      text: "(SELECT id FROM posts where tags like '%%"+tag[0]+"%%' and tags like '%%"+tag[1]+"%%' and tags like '%%"+tag[2]+"%%' and tags like '%%"+tag[3]+"%%' and tags like '%%"+tag[4]+"%%')",
      values: [],
    }
    client.query(query2, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { 
        console.log(resl.rowCount)
        pageCount=Math.ceil(resl.rowCount/8)
      }
    })
    client.query(query1, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { console.log(resl.rows)
        res.json({
          posts:resl.rows,
          totpage:pageCount
        })
      }
    })

 })


 router.post('/posts/multiple_tags/:id1',(req,res)=>
 {
     let pagenum = req.params.id1;
    console.log(req.body);
    let tag =[5];
    for(let i=0;i<req.body.tags.length;i++){
      tag[i]="<"+req.body.tags[i]+">";
    }
    for(let i=req.body.tags.length;i<5;i++){
      tag[i]="";
    }
    const query={
      text: "(SELECT * FROM posts where tags like '%%"+tag[0]+"%%' and tags like '%%"+tag[1]+"%%' and tags like '%%"+tag[2]+"%%' and tags like '%%"+tag[3]+"%%' and tags like '%%"+tag[4]+"%%' order by creation_date limit "+pagenum*8+") except (SELECT * FROM posts where tags like '%%"+tag[0]+"%%' and tags like '%%"+tag[1]+"%%' and tags like '%%"+tag[2]+"%%' and tags like '%%"+tag[3]+"%%' and tags like '%%"+tag[4]+"%%' order by creation_date limit "+(pagenum-1)*8+")",
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
//searching answers
router.get('/posts/:id1',(req,res)=>
{
    let post_id = req.params.id1; 
    const query={
      text: "SELECT * FROM answers where post_id = $1 order by creation_date desc limit 8",
      values: [post_id],
    }
    const query2={
      text: "SELECT * FROM answers where post_id = '"+post_id+"'",
      values: [],
    }
    let pagenum=0;
    client.query(query2, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { 
        console.log(resl.rowCount)
        pagenum=Math.ceil(resl.rowCount/8)
      }
    })
    client.query(query, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { //console.log(resl.rows)
        // console.log(resl.rowCount)
        console.log(pagenum)
        res.json({
          answers:resl.rows,
          totpage:pagenum,
        })
      }
    })
    
    
})


//searching posts of page 1 from tags
  router.post('/posts/tag/:id',(req,res)=>
  {
     let tag = req.params.id; console.log(tag)
     let flg = req.body.filter;
     let query1;
     if(flg=='latest'){
      query1 = {
      text: "SELECT * FROM posts where tags like '%%<"+tag+">%%' order by creation_date desc limit 8",
      values: [],
    }}
    else if(flg =='oldest'){
       query1 = {
        text: "SELECT * FROM posts where tags like '%%<"+tag+">%%' order by creation_date limit 8",
        values: [],
      }
    }
    else {
       query1 = {
        text: "SELECT * FROM posts where tags like '%%<"+tag+">%%' order by up_votes desc limit 8",
        values: [],
      }
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

//searching answers acc to pagenum
router.get('/posts/:id1/:id2',(req,res)=>{
  let post_id =req.params.id1;
  let pagenum =req.params.id2;
  const query ={
    text: "(SELECT * FROM answers where post_id = '"+post_id+"' order by creation_date limit "+pagenum*8+" ) except (SELECT * FROM answers where post_id = '"+post_id+"' order by creation_date limit "+(pagenum-1)*8+" )"
  }
  client.query(query, (err, resl) => {
    if (err) {
      console.log(err.stack)
    }
    else
    { console.log(resl.rows)
      console.log(resl.rowCount)
      console.log(pagenum)
      res.json({
        answers:resl.rows,
      })
    }
  })

})

  router.get('/posts/user/:id',(req,res)=>
  {
     let owner = req.params.id; console.log(owner)
     const query1 = {
      text: "SELECT * FROM posts where Owner_id ="+owner+" order by creation_date limit 8",
      values: [],
    }
    let posts=[];
    const query2 = {
      text: "SELECT id FROM posts where Owner_id = "+owner,
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
            console.log(Math.ceil(resl.rowCount/8))

            res.json({
              posts:posts,
              totpage:Math.ceil(resl.rowCount/8)
            })
          }
        })
          
  });
  router.get('/posts/user/:id1/:id2',(req,res)=>
  {
      let tag = req.params.id1; 
      let pagenum = req.params.id2;
      const query1={
        text: "(SELECT * FROM posts where Owner_id = "+tag+" order by creation_date limit "+pagenum*8+" ) except (SELECT * FROM posts where Owner_id = "+tag+" order by creation_date limit "+(pagenum-1)*8 +");",
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

  //for user home
  router.post('/home2',authenticateToken,(req,res)=>
  {
      let posts=[]
      const query1={
       text: "SELECT * FROM posts where owner_id ="+req.user.userid,       
        values: [],
      }
      client.query(query1, (err, resl) => {
        if (err) {
          console.log(err.stack)
        }
        else
        { console.log(resl.rows)
          console.log(resl.rowCount)
    
            posts=resl.rows
       
        }
      })
      const query2 = {
        text: "SELECT id FROM posts where Owner_id = "+req.user.userid,
        values: [],
      }

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

  })

  //user home2 next and back
  router.post('/home2/:id',authenticateToken,(req,res)=>
  {
      let pagenum = req.params.id;
      const query={
        text: "(SELECT * FROM posts where owner_id="+req.user.userid+" order by creation_date limit "+pagenum*8+" ) except (SELECT * FROM posts where owner_id="+req.user.userid+" order by creation_date limit "+(pagenum-1)*8 +");",
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


  //edit post by user
  router.post('/edit_post',authenticateToken,(req,res)=>
  {
    const ownerid=req.user.userid;
    const Ownername=req.user.userName;
    const post_title=req.body.title;
    const post_body= req.body.body;
    const postid=req.body.postid;

     //console.log(req)
    //const tags=req.body.tags;
    let tag =[req.body.tags.length];
    for(let i=0;i<req.body.tags.length;i++){
      tag[i]="<"+req.body.tags[i]+">";
    }
    let tagstring="";
    for(let j=0;j<req.body.tags.length;j++){
      tagstring=tagstring+tag[j];
    }
    //console.log(tagstring);
    const last_modified=new Date(Date.now());
    let time =last_modified.toISOString();
    console.log(postid,post_title)
    const query ={
      text : 'update posts set title = $2, tags = $3, body = $4, last_modified = $5 where id = $1',
      values: [postid,post_title,tagstring,post_body,time]
    }
    console.log(tagstring)
    client.query(query, (err, resl) => {
      if (err) {
        console.log(err.stack)
      }
      else
      { 
        console.log(resl.rows)
        console.log(resl.rowCount)
        console.log("edited post");
           res.json(
           {
            tokenStatus:1,
            postRes:1
           });
      }
    })




  })

  //delete a post along with answers
  router.delete('/delete_post:id',authenticateToken,(req,res)=>{
      const postid=req.params.id;
      //write delete query for the post
      //write a trigger in schema to delete all answers when an question post is deleted
      //fill this query harsha
      const query={
        text:'',
        value:[],
      }


      client.query(query,(err,resl)=>{
        if(err){
          console.log(err.stack);
        }
        else{
          console.log(resl.rows)
          console.log(resl.rowCount)
          console.log("deleted post");
             res.json(
             {
              tokenStatus:1,
              postRes:1
             });
        }
      })
  })


  router.post('/upvote',authenticateToken,(req,res)=>
  {

  });
  router.post('/downvote',authenticateToken,(req,res)=>
  {
     
  });

export default router;
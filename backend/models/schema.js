import client from '../config/database.js'
client.connect((err)=>
{
  if(err)
  {
    console.log(err)
  }
  else console.log('connected')
});
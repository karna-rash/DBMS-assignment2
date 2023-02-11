const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'assig2',
  password: 'Chintu@iith',
  port: 5432,
})
client.connect(()=>
{
  if(err)
  {
    console.log(err)
  }
});

export default client;
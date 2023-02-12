
import client from '../cofig/database.js'
client.connect(()=>
{
  if(err)
  {
    console.log(err)
  }
  var sql="CREATE TABLE user_info ( "+
  " id SERIAL PRIMARY KEY, "+
  "email varchar(40), "+
  "account_id INTEGER, "+
  "reputation INTEGER NOT NULL, "+
  "views INTEGER DEFAULT 0, "+
  "down_votes INTEGER DEFAULT 0, "+
  "up_votes INTEGER DEFAULT 0, "+
  "display_name VARCHAR(255) NOT NULL, "+
  "location VARCHAR(512), "+
  "profile_image_url VARCHAR(255), "+
  "website_url VARCHAR(255), "+
  "about_me TEXT, "+
  "creation_date TIMESTAMP NOT NULL, "+
  "last_access_date TIMESTAMP NOT NULL )";

  con.query(sql, function (err, result) {
      if (err) throw err;
    });

var sql1="create table user ( id serial primary key, password varchar(30) not null, display_name varchar(255))";

con.query(sql1, function (err, result) {
  if (err) throw err;
});

});
client.close();
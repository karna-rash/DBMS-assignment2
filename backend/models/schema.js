import client from '../config/database.js';

  var sql1="create table if not exists users ("+
  " id integer, "+
  " username varchar (40),"+
  " password varchar(30),"+
  " display_name varchar(255),"+
  " primary key (id))";

client.query(sql1, function (err, result) {
if (err) throw err;

});
  var sql="CREATE TABLE if not exists user_info ( "+
  "id integer, "+
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
  "last_access_date TIMESTAMP NOT NULL, "+
  "primary key (id), "+
  "foreign key (id,display_name) references users "+
  ");";

 client.query(sql, function (err, result) {
      if (err) console.error(err);
    });

var sqll2="CREATE table if not exists tags ( "+
	" id SERIAL PRIMARY KEY, "+
	" tag_name VARCHAR(255) NOT NULL "+
  " );"
  client.query(sqll2, function (err, result) {
    if (err) console.error(err);
    else{
      client.end();
     }
  });
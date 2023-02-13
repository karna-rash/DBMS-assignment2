import pg from "pg"
import dotenv from 'dotenv'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({path: __dirname+'\\..\\.env' });
const { Client } = pg
const client = new Client({
  user: PGUSER,
  host: PGHOST,
  database: PGDB,
  password: PGPWD,
  port: PGPORT,
  ENDPOINT_ID:PGEND_POINT,
  ssl:{
    rejectUnauthorized: true
  }
})


export default client;
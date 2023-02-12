import pg from "pg"
const { Client } = pg
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'cqadb',
  password: 'harshA',
  port: 5432,
})


export default client;
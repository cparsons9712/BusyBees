const { Client } = require('pg');

const client = new Client({
  host: 'db',
  user: 'postgres',
  password: '1617',
  database: 'postgres',
});

client.connect()
  .then(() => console.log("Connected to DB successfully!"))
  .catch(err => console.error("Failed to connect to DB:", err))
  .finally(() => client.end());

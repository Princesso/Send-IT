import { Pool }  from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Connection Established');
});

const createTables = async () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE,
        phone VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )
  `;
  await pool.query(userTable)
    .then((res) => {
      console.log('users table created!: ', res);
      //pool.end();
    })
    .catch((err) => {
      console.log('An error occured while creating users table: ', err);
      pool.end();
    });

};

createTables().then(res => console.log('All tables created'));

export default {
  createTables,
  dropTables
}
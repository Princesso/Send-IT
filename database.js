import { Pool }  from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Connection Established');
});

/**
 * Create Tables
 */
const createTables = async () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS
      users1(
        userid SERIAL PRIMARY KEY,
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
      // pool.end();
    })
    .catch((err) => {
      console.log('An error occured while creating users table: ', err);
      pool.end();
    });
  
  const parcelsTable = `
    CREATE TABLE IF NOT EXISTS
      parcels1(
        id SERIAL PRIMARY KEY,
        userid INTEGER REFERENCES users(id),
        weight INTEGER NOT NULL, 
        description VARCHAR,
        fromaddress VARCHAR NOT NULL,
        toaddress VARCHAR NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )
  `;
  return pool.query(parcelsTable)
  .then((res) => {
    console.log('parcels table created!: ', res);
    pool.end();
  })
  .catch((err) => {
    console.log('An error occured while creating parcels table: ', err);
    pool.end();
  });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS parcels, users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

createTables().then(res => console.log('All tables created'));

export default {
  createTables,
  dropTables
}
import { Pool }  from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Connection Established');
});

const createTables = async () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        othernames VARCHAR(30),
        email VARCHAR(128) UNIQUE,
        username VARCHAR(128) NOT NULL,
        registered TIMESTAMP,
        isAdmin BOOLEAN,
        password VARCHAR NOT NULL
      )
  `;
  await pool.query(userTable)
    .then((res) => {
      console.log('users table created!: ', res);
    })
    .catch((err) => {
      console.log('An error occured while creating users table: ', err);
      pool.end();
    });
  const parcelsTable = `
    CREATE TABLE IF NOT EXISTS
      parcels(
        id SERIAL PRIMARY KEY,
        placedBy INTEGER REFERENCES users(id),
        weight FLOAT NOT NULL, 
        weightmetric VARCHAR NOT NULL,
        sentOn TIMESTAMP,
        deliveredOn DATE,
        status VARCHAR NOT NULL,
        fromAddress VARCHAR NOT NULL,
        toAddress VARCHAR NOT NULL,
        currentLocation VARCHAR
      )
  `;
  pool.query(parcelsTable)
  .then((res) => {
    console.log('parcels table created!: ', res);
  })
  .catch((err) => {
    console.log('An error occured while creating parcels table: ', err);
    pool.end();
  });
};

const dropTables = async () => {
  const dropQuery = 'DROP TABLE IF EXISTS parcels, users';
  await pool.query(dropQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

createTables().then(res => console.log('All tables created'));

export const dbQuery = (queryStatement, params, callback) => {
  return pool.query(queryStatement, params, callback)
 };

export default {
  pool,
  createTables,
  dropTables
}
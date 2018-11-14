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
        id INTEGER PRIMARY KEY,
        firstname VARCHAR(30),
        lastname VARCHAR(30),
        othernames VARCHAR(30),
        email VARCHAR(128) UNIQUE,
        username VARCHAR(128) NOT NULL,
        registered DATE,
        isAdmin BOOLEAN
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
  const parcelsTable = `
    CREATE TABLE IF NOT EXISTS
      parcels(
        id SERIAL PRIMARY KEY,
        placedBy INTEGER REFERENCES users(id),
        weight FLOAT NOT NULL, 
        weightmetric VARCHAR NOT NULL,
        sentOn DATE,
        deliveredOn DATE,
        status VARCHAR NOT NULL,
        fromAddress VARCHAR NOT NULL,
        toAddress VARCHAR NOT NULL,
        currentLocation VARCHAR NOT NULL
      )
  `;
  pool.query(parcelsTable)
  .then((res) => {
    console.log('parcels table created!: ', res);
    pool.end();
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
      pool.end();
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
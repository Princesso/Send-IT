import { Client }  from 'pg';
import dotenv from 'dotenv';
import "@babel/polyfill"

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect()

const dropTable = async () => {
  const drop = `DROP TABLE IF EXISTS parcels;
                DROP TABLE IF EXISTS users;
                `
    try {
      await client.query(drop);
      console.log('tables dropped');
    } catch(error) {

      console.log('error while droppind tables', error);
    }
}

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
  try {
    console.log('users table created!: ');
    await client.query(userTable)
  } catch (error) {
    console.log('An error occured while creating users table: ', error);
    client.end();
  }

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
        currentLocation VARCHAR,
        itemname VARCHAR(30),
        recipient VARCHAR(40)
      )
  `;
  try {
    console.log('prcels table created!: ');
    await client.query(parcelsTable)
  } catch (error) {
    console.log('An error occured while creating parcels table: ', error);
    client.end();
  }
};

  createTables().then(res => {
    console.log('All tables created')
  });

export default  client

import pg from 'pg'

const config = {
  user: "amanda",
  database: "sendit",
  password: "password",
  port: "5432",
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('database connection established');
});

const createTables = async () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS
      users(
        userid SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE,
        phone VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL
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
      parcels(
        id SERIAL PRIMARY KEY,
        userid INTEGER REFERENCES users(id),
        weight INTEGER NOT NULL, 
        description VARCHAR,
        fromaddress VARCHAR NOT NULL,
        toaddress VARCHAR NOT NULL
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

createTables().then(res => console.log('All tables created'))
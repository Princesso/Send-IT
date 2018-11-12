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


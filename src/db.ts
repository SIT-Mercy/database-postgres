import postgres from 'postgres'

export function connectToPostgres(options: postgres.Options<{}>): postgres.Sql<{}> {
  return postgres(options)
}

export const sql = postgres({
  host: '',            // Postgres ip address[s] or domain name[s]
  port: 5432,          // Postgres server port[s]
  database: '',            // Name of database to connect to
  username: '',            // Username of database user
  password: '',            // Password of database user
})

export function initDatabase(sql: postgres.Sql<{}>) {
  initAuthorization(sql)
  initStudens(sql)
  initPointChanges(sql)
  initItems(sql)
  initDonationRecords(sql)
  initRentalRecords(sql)
}

function initAuthorization(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] Authorization (
    id serial PRIMARY KEY,
    studentID VARCHAR ( 20 ) UNIQUE NOT NULL,
    password VARCHAR ( 20 ) NOT NULL,
    creationTime TIMESTAMP NOT NULL,
    lastLogin TIMESTAMP
  );
  `
}

function initStudens(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] Students (
    id serial PRIMARY KEY,
    studentID VARCHAR ( 20 ) UNIQUE NOT NULL,
    name VARCHAR ( 20 ) NOT NULL,
    point INTEGER NOT NULL,
    //??? isPoor BOOLEAN NOT NULL
  );
  `
}

function initPointChanges(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] PointChanges (
    id serial PRIMARY KEY,
    subject VARCHAR ( 20 ) NOT NULL,
    operator VARCHAR ( 20 ) NOT NULL,
    pointBefore INTEGER NOT NULL,
    pointAfter INTEGER NOT NULL,
    creationTime TIMESTAMP NOT NULL
  );
  `
}

function initItems(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] Items (
    id serial PRIMARY KEY,
    name VARCHAR ( 20 ) NOT NULL,
    description VARCHAR ( 512 ) NOT NULL,
    //??? imageURL VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    creationTime TIMESTAMP NOT NULL
  );
  `
}

function initDonationRecords(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] DonationRecords (
    id serial PRIMARY KEY,
    name VARCHAR ( 20 ) NOT NULL,
    description VARCHAR ( 512 ) NOT NULL,
    //??? imageURL VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    creationTime TIMESTAMP NOT NULL
  );
  `
}

function initRentalRecords(sql: postgres.Sql<{}>){
  sql`
  CREATE TABLE [IF NOT EXISTS] RentalRecords (
    id serial PRIMARY KEY,
    name VARCHAR ( 20 ) NOT NULL,
    phoneNumber VARCHAR ( 32 ) NOT NULL,
    //??? KEY? borrower INTEGER NOT NULL,
    //??? KEY? operator INTEGER NOT NULL,
    deadline TIMESTAMP NOT NULL,
    creationTime TIMESTAMP NOT NULL
  );
  `
}
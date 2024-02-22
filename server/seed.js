// dotenv set up
import dotenv from "dotenv";
dotenv.config();
// set up pg
import pg from "pg";
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
// create a table for the otters - query the db and use the SQL command and name the table
db.query(`CREATE TABLE IF NOT EXISTS otters (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    location TEXT,
    conservationStatus TEXT,
    url TEXT
)`);
// insert otter data into the table - do not complete the id because it is a serial it will automatic
db.query(`INSERT INTO otters (name, location, conservationStatus, url)
VALUES
('Sea Otter', 'North Pacific Ocean', 'Endangered', 'https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg'), 
('Giant Otter', 'South America', 'Endangered', 'https://www.otterspecialistgroup.org/osg-newsite/wp-content/uploads/2018/02/giantotter-1584x1200.jpg'),
('Eurasian Otter', 'Europe, Asia, and parts of North Africa', 'Near Threatened', 'https://newforestwildlifepark.co.uk/media/hj3pyt1v/285204042_5298260206878795_2753595315870641423_n.jpg?rxy=0.4921199895729032,0.3836624810607292&rnd=133344220221730000')
`);

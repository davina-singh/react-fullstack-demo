// set up express
import express from "express";
const app = express();
app.use(express.json());
// set up cors
import cors from "cors";
app.use(cors());
// dotenv set up
import dotenv from "dotenv";
dotenv.config();
// set up pg
import pg from "pg";
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
// set up the port as variable so it can be changed
const PORT = 8080;
// listen to the port and clg a message for which port it is running on
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
// set up a root route
app.get("/", (request, response) => {
  response.send("This is my root route, how roude!");
});
// endpoint to get otters
app.get("/otters", async (request, response) => {
  const result = await db.query(`SELECT * FROM otters`);
  // the response will all of the results row by row
  response.json(result.rows);
});
// endpoint to make a post
app.post("/otters", async (request, response) => {
  const result = await db.query(
    `INSERT INTO otters (name, location, conservationStatus, url) VALUES ($1, $2, $3, $4);`,
    [
      request.body.name,
      request.body.location,
      request.body.conservationStatus,
      request.body.url,
    ]
  );
  response.json(result.rows);
});

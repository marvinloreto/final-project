require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

// Sample code from copy. Delete before pushing Issue-1
app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/exercises', (req, res, next) => {
  const { exerciseName, sets, reps, target, notes, date } = req.body;
  if (!exerciseName || !sets || !reps || !target || !notes || !date) {
    throw new ClientError(400, 'Error: exerciseName, sets, reps, target, notes, date are required fields');
  }
  if (isNaN(sets) || isNaN(reps)) {
    throw new ClientError(400, 'Error: sets, reps, must be a number.');
  }
  const sql = `
      insert into "workouts" ("date")
      values ($1)
      returning *
      `;
  const params = [date];
  db.query(sql, params)
    .then(result => {
      const [workouts] = result.rows;
      return (workouts.workoutId);
    })
    .then(data => {
      const sql = `
          insert into "exercises" ("exerciseName", "target", "sets", "reps", "notes")
          values ($1, $2, $3, $4, $5)
          returning *
          `;
      const params = [exerciseName, target, sets, reps, notes];
      db.query(sql, params)
        .then(result => {
          const [exercises] = result.rows;
          res.status(201).json(exercises);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

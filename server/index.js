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

app.get('/api/workouts', (req, res, next) => {
  const sql = `
      select *
      from "workouts"
      ORDER BY "date"
      `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/exercises/:workoutId', (req, res, next) => {
  const workoutId = Number(req.params.workoutId);
  if (isNaN(workoutId) || !workoutId || workoutId < 1) {
    throw new ClientError(400, 'Error: workoutId must be a positive integer');
  }
  const sql = `
      select *
      from "exercises"
      where "workoutId" = $1
      `;
  const params = [req.params.workoutId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/exercises', (req, res, next) => {
  const { exerciseName, sets, reps, target, notes, date } = req.body;
  if (!exerciseName || !sets || !reps || !target || !notes || !date) {
    throw new ClientError(400, 'Error: exerciseName, sets, reps, target, notes, date are required fields');
  }
  if (isNaN(sets) || isNaN(reps) || Number(sets) < 0 || Number(reps) < 0) {
    throw new ClientError(400, 'Error: sets, reps, must be a positive number.');
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

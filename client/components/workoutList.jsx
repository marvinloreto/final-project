import React from 'react';

export default function WorkoutList(props) {
  return (
    <ul>
      {props.workouts.map(array => {
        const workoutDay = new Date(array.date).getUTCDate();
        const workoutMonth = Number(new Date(array.date).getUTCMonth()) + 1;
        const workoutYear = new Date(array.date).getUTCFullYear();
        return (
          <li className='workout-dates' key={array.workoutId}>
            <button onClick={ e => props.dateSelect(e, array.workoutId)} key={array.workoutId} className='slash-dates'>{workoutMonth} / {workoutDay} / {workoutYear} <br /> Workouts: 1</button>
          </li>
        );
      })}
    </ul>
  );
}

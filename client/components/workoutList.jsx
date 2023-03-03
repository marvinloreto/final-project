import React from 'react';

export default function WorkoutList(props) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return (
    <ul>
      {props.workouts.map(array => {
        const workoutDates = new Date(array.date).toLocaleDateString('en-US', options);
        return (
          <li className='workout-dates' key={array.workoutId}>
            <button onClick={ e => props.dateSelect(e, array.workoutId)} key={array.workoutId} className='slash-dates'>{workoutDates} <br /> Workouts: 1</button>
          </li>
        );
      })}
    </ul>
  );
}

import React from 'react';

export default function WorkoutList(props) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return (
    <ul>
      {props.workouts.map(array => {
        const workoutDates = new Date(array.Date).toLocaleDateString('en-US', options);
        return (
          <li className='workout-dates' key={array.workoutId}>
            <button onClick={ e => props.dateSelect(e, array.workoutId)} key={array.workoutId} className='slash-dates'>{workoutDates}</button>
          </li>
        );
      })}
    </ul>
  );
}

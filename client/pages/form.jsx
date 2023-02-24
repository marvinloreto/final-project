import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleExercise = this.handleExercise.bind(this);
    this.handleSets = this.handleSets.bind(this);
    this.handleReps = this.handleReps.bind(this);
    this.handleTarget = this.handleTarget.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.state = {
      exerciseName: '',
      sets: '',
      reps: '',
      target: '',
      notes: '',
      date: ''
    };
  }

  handleExercise(event) {
    this.setState({ exerciseName: event.target.value });
  }

  handleSets(event) {
    this.setState({ sets: event.target.value });
  }
}

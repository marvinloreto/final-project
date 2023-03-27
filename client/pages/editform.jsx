import React from 'react';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      exerciseName: '',
      sets: '',
      reps: '',
      target: '',
      notes: ''
    };
  }

  componentDidMount() {
    const details = this.props.details.y[0];
    this.setState({
      exerciseName: details.exerciseName,
      target: details.target,
      sets: details.sets,
      reps: details.reps,
      notes: details.notes
    });
  }

  handleExerciseChange(event) {
    this.setState({ workoutName: event.target.value });
  }

  handleRepsChange(event) {
    this.setState({ reps: event.target.value });
  }

  handleSetsChange(event) {
    this.setState({ sets: event.target.value });
  }

  handleTargetChange(event) {
    this.setState({ muscleGroup: event.target.value });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const Edit = {
      exerciseName: this.state.exerciseName,
      target: this.state.target,
      sets: this.state.sets,
      reps: this.state.reps,
      notes: this.state.notes
    };
    fetch(`/api/exercises/${this.props.details.y[0].workoutId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Edit)
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    this.setState({
      exerciseName: '',
      target: '',
      sets: '',
      reps: '',
      notes: ''
    });
    window.location.hash = '#workouts';
  }
}

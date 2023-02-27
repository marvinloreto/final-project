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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleReps(event) {
    this.setState({ reps: event.target.value });
  }

  handleTarget(event) {
    this.setState({ target: event.target.value });
  }

  handleNotes(event) {
    this.setState({ notes: event.target.value });
  }

  handleDate(event) {
    this.setState({ date: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const workoutExercise = {
      exerciseName: this.state.exerciseName,
      sets: this.state.sets,
      reps: this.state.reps,
      target: this.state.target,
      notes: this.state.notes,
      date: this.state.date
    };

    fetch('/api/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutExercise)
    })
      .then(result => result.json())
      .catch(err => console.error(err));
    this.setState({
      exerciseName: '',
      sets: '',
      reps: '',
      target: '',
      notes: '',
      date: ''
    });
  }

  render() {
    return (
      <div className="container-form">
        <div className="row form-header-row">
          <div className="col-8">
            <h3 className="form-header">New Workout</h3>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column-full-exerciseName">
              <label htmlFor="exercise-name">
                Exercise:
                <input required placeholder="Exercise Name" className="form-control exercise-input" name="name" type="text" id="exercise-name" onChange={this.handleExercise} value={this.state.exerciseName} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="column-sets col-5">
              <label htmlFor="sets">
                Sets:
                <input required placeholder="# of sets" className="form-control" name="sets" type="number" id="sets" onChange={this.handleSets} value={this.state.sets} />
              </label>
            </div>
            <div className="column-reps col-5">
              <label htmlFor="reps">
                Reps:
                <input required placeholder="# of reps" className="form-control" name="reps" type="number" id="reps" onChange={this.handleReps} value={this.state.reps} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="target-column column-full">
              <label htmlFor="target" className="target-label">
                Target: <br/>
                <select className="target-select" name="target" required onChange={this.handleTarget}>
                  <option value="">Target Muscles</option>
                  <option value="Chest">Chest</option>
                  <option value="Back">Back</option>
                  <option value="Arms">Arms</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Abs">Abs</option>
                  <option value="Legs">Legs</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="notes-column column-full">
              <label htmlFor="notes" className="notes-label" >
                Notes:
                <textarea required placeholder="Additional Notes:" className="form-control notes-control" id="notes" rows="3" onChange={this.handleNotes} value={this.state.notes} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="date-column column-full">
              <label htmlFor="date">
                Date:
                <input required className="form-control date-control" name="date" type="date" id="date" onChange={this.handleDate} value={this.state.date} />
              </label>
            </div>
          </div>
          <button className="form-submit-button" type="submit">Add Exercise</button>
        </form>
      </div>
    );
  }

}

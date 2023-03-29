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
    const info = this.props.info.y[0];
    this.setState({
      exerciseName: info.exerciseName,
      target: info.target,
      sets: info.sets,
      reps: info.reps,
      notes: info.notes
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
    fetch(`/api/exercises/${this.props.info.y[0].workoutId}`, {
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

  render() {
    const workouts = this.props.workouts.x;
    const info = this.props.info.y[0];
    const finalChoice = workouts.find(x => x.workoutId === info.workoutId);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = new Date(finalChoice.Date).toLocaleDateString('en-US', options);
    return (
      <div className="container-form">
        <div className="row form-header-row">
          <div className="col-8">
            <h3 className="from-header">{dateString}</h3>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column-full-exerciseName">
              <label htmlFor="exercise-name">
                Exercise:
                <input required placeholder="Exercise Name" className="form-control exercise-input" name="name" type="text" id="exercise-name" onChange={this.handleExerciseChange} value={this.state.exerciseName} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="column-sets col-5">
              <label htmlFor="sets">
                Sets:
                <input required placeholder="# of sets" className="form-control" name="sets" type="number" id="sets" onChange={this.handleSetsChange} value={this.state.sets} />
              </label>
            </div>
            <div className="column-reps col-5">
              <label htmlFor="reps">
                Reps:
                <input required placeholder="# of reps" className="form-control" name="reps" type="number" id="reps" onChange={this.handleRepsChange} value={this.state.reps} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="target-column column-full">
              <label htmlFor="target" className="target-label">
                Target: <br />
                <select className="target-select" name="target" required onChange={this.handleTargetChange} value={this.state.target}>
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
                <textarea required placeholder="Additional Notes:" className="form-control notes-control" id="notes" rows="3" onChange={this.handleNotesChange} value={this.state.notes} />
              </label>
            </div>
          </div>
          <button className="form-submit-button" type="submit">Edit</button>
        </form>
      </div>
    );
  }
}

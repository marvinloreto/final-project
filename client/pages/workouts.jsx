import React from 'react';
import MonthSelector from '../components/month-selector';
import WorkoutList from '../components/workoutList';

export default class WorkoutViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      workouts: [],
      info: [],
      isClicked: false
    };
    this.handleClickItem = this.handleClickItem.bind(this);
    this.monthSelect = this.monthSelect.bind(this);
    this.dateSelect = this.dateSelect.bind(this);
    this.info = this.info.bind(this);
    this.exit = this.exit.bind(this);
  }

  handleClickItem(event) {
    this.setState({ month: event.target.value });
  }

  componentDidMount() {
    fetch('/api/workouts')
      .then(res => res.json())
      .then(data => this.setState({ workouts: data }))
      .catch(err => console.error(err));
  }

  monthSelect() {
    const selectedMonth = this.state.month;
    return (
      this.state.workouts.filter(array => array.date.split('-')[1] === selectedMonth)
    );

  }

  dateSelect(event, workoutId) {
    fetch(`/api/exercises/${workoutId}`)
      .then(res => res.json())
      .then(data => this.setState({ info: data, isClicked: true }))
      .catch(err => console.error(err));
  }

  exit() {
    this.setState({ isClicked: false });
  }

  info() {
    const currentInfo = this.state.info[0];
    const finalChoice = this.state.workouts.find(array => array.workoutId === currentInfo.workoutId);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = new Date(finalChoice.date).toLocaleDateString('en-US', options);
    return (
      <div className='overlay'>
        <div>
          <div className='info-menu'>
            <div className='info-title'>
              <h1 className='info-date'>{dateString}</h1>
              <i onClick={this.exit} className='fa-solid fa-square-xmark' />
            </div>
            <h2 className='info-name'>{currentInfo.exerciseName}</h2>
            <h3 className='info-target'>Target: {currentInfo.target}</h3>
            <div className='info-numbers'>
              <h4 className='info-sets'>Sets: {currentInfo.sets}</h4>
              <h4 className='info-reps'>Reps: {currentInfo.reps}</h4>
            </div>
            <h4 className='info-notes-title'>Notes:</h4>
            <h4 className='info-notes'>{currentInfo.notes}</h4>
            <i className='fa-solid fa-pen-to-square' />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.monthSelect().length > 0 && this.state.isClicked === true) {
      return (
        <div>
          <MonthSelector handleClickItem={this.handleClickItem} />
          <WorkoutList dateSelect={this.dateSelect} workouts={this.monthSelect()} />
          {this.info()}
        </div>
      );
    } if (this.monthSelect().length > 0) {
      return (
        <div>
          <MonthSelector handleClickItem={this.handleClickItem} />
          <WorkoutList dateSelect={this.dateSelect} workouts={this.monthSelect()} />
        </div>
      );
    } else {
      return (
        <div>
          <MonthSelector handleClickItem={this.handleClickItem} />
          <h2 className='no-workout'>No workouts currently <br/>logged for this month.</h2>
        </div>
      );
    }
  }
}

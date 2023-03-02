import React from 'react';
import MonthSelector from '../components/month-selector';
import WorkoutList from '../components/workoutList';

export default class WorkoutViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      workouts: [],
      details: [],
      isClicked: false
    };
    this.handleClickItem = this.handleClickItem.bind(this);
    this.monthSelect = this.monthSelect.bind(this);
    this.dateSelect = this.dateSelect.bind(this);
    this.details = this.details.bind(this);
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
      this.state.workouts.filter(array => array.Date.split('-')[1] === selectedMonth)
    );
  }

  dateSelect(event, workoutId) {
    fetch(`/api/exercises/${workoutId}`)
      .then(res => res.json())
      .then(data => this.setState({ details: data, isClicked: true }))
      .catch(err => console.error(err));
  }

  exit() {
    this.setState({ isClicked: false });
  }
}

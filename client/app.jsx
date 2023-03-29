import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import Header from './components/header';
import MenuModal from './components/menu';
import parseRoute from './lib/parse-route';
import WorkoutViews from './pages/workouts';
import EditForm from './pages/editform';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      workouts: '',
      info: ''
    };
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const welcome = parseRoute(window.location.hash);
      this.setState({ route: welcome });
    });
  }

  updateInfo(x, y) {
    this.setState({ workouts: { x }, info: { y } });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'form') {
      return <Form />;
    }
    if (route.path === 'workouts') {
      return <WorkoutViews updateInfo={this.updateInfo}/>;
    }
    if (route.path === 'editform') {
      return <EditForm workouts={this.state.workouts} info={this.state.info}/>;
    }
  }

  render() {
    return (
      <>
        <MenuModal />
        <Header />
        {this.renderPage()}
      </>
    );
  }
}

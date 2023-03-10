import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import Header from './components/header';
import MenuModal from './components/menu';
import parseRoute from './lib/parse-route';
import WorkoutViews from './pages/workouts';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const welcome = parseRoute(window.location.hash);
      this.setState({ route: welcome });
    });
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
      return <WorkoutViews />;
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

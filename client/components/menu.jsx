import React from 'react';

export default class MenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const hamburger = this.state.isOpen ? 'hidden' : 'fa-solid fa-bars menu-bars';
    const toggleMenu = this.state.isOpen ? 'menu' : 'hidden';
    const modalBackground = this.state.isOpen ? 'modal' : 'hidden';

    return (
      <div>
        <div className='button'>
          <i className={hamburger} onClick={this.handleClick} />
        </div>
        <div className={toggleMenu}>
          <ul className='list'>
            <li onClick={this.handleClick}><a className='menu-button' href='#'>Home</a></li>
            <li onClick={this.handleClick}><a className='menu-button' href='#workouts'>Workouts</a></li>
            <li onClick={this.handleClick}><a className='menu-button' href='#'>Favorites</a></li>
          </ul>
          <div className={modalBackground} onClick={this.handleClick} />
        </div>
      </div >
    );
  }
}

import React from 'react';

export default function Header(props) {

  return (
    <header>
      <div className='container'>
        <div className='row header-row'>
          <div className='col-1'/>
          <div className='col-10'>
            <h1 className='header'>Gym Tracker</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

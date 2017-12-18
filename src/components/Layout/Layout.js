import React from 'react';

import Aux from '../../hoc/Aux';

import logo from '../../assets/images/logo.svg';
import './Layout.css';

const layout = ( props ) => (
    <Aux>
      <div className='app'>
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Welcome to React</h1>
        </header>

        <div className="flash">
        </div>

        <main className="content">
          {props.children}
        </main>
      </div>
    </Aux>
);

export default layout;
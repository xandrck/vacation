import React from 'react';

import Aux from '../../hoc/Aux';

import logo from '../../assets/images/logo.svg';
import './Layout.css';

const layout = ( props ) => (
    <Aux>
      <main className='content'>
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Welcome to React</h1>
        </header>

        {props.children}
      </main>
    </Aux>
);

export default layout;
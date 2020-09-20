import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import styles from './App.module.css';
import Home from './components/Home/Home';
import Analysis from './components/Analysis/Analysis';


import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className={styles.menu}>
          <div >
            <NavLink to='/' className={styles.menuTitle}  > ShortenIt </NavLink>
          </div>
          <div>
            <NavLink to='/analysis' className={styles.menuItem} activeClassName={styles.selectedNav} > Analysis </NavLink>
          </div>
        </div>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/analysis' component={Analysis} />

        </Switch>
      </Router>

    </>
  );
}

export default App;

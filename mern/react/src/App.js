// App.js

import React, { Component } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import Routes from './Routes';
||||||| merged common ancestors
import CreateProfile from './components/CreateProfile';
import RequestHelp from './components/requestHelp';
import PetsList from './components/PetsList';
import PetRegister from './components/PetRegister';
=======
import CreateProfile from './components/CreateProfile';
import RequestHelp from './components/requestHelp';
import PetsList from './components/PetsList';
import EditPet from './components/EditPet';
import PetRegister from './components/PetRegister';
>>>>>>> c77972e3bbd183d131616e1d7490b20298f14dbe


class App extends Component {

  render() {
    return (
<<<<<<< HEAD
        <Routes />
||||||| merged common ancestors
      <Provider store = { store } >
        <Router>
          <div>
            <Navbar />
            <Route exact path="/dashboard" component={ Home } />
            <Route exact path="/CreateProfile" component={ CreateProfile } />
            <Route exact path="/requesthelp" component={ RequestHelp } />
            <Route exact path="/pets" component={ PetsList } />
            <Route exact path="/petregister" component= { PetRegister} />
              <div className="container">
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
              </div>
          </div>
        </Router>
      </Provider>
=======
      <Provider store = { store } >
        <Router>
          <div>
            <Navbar />
            <Route exact path="/dashboard" component={ Home } />
            <Route exact path="/CreateProfile" component={ CreateProfile } />
            <Route exact path="/requesthelp" component={ RequestHelp } />
            <Route exact path="/pets" component={ PetsList } />
            <Route path="/pet/:id/edit" component={ EditPet } />
            <Route exact path="/petregister" component= { PetRegister} />
              <div className="container">
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
              </div>
          </div>
        </Router>
      </Provider>
>>>>>>> c77972e3bbd183d131616e1d7490b20298f14dbe
    );
  }
}

export default App;
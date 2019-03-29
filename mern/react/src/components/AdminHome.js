import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'

class  AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
  render() { 
    return ( 	
      <div className="d-flex" id="wrapper">

    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Start Bootstrap </div>
      <div className="list-group list-group-flush">
        <Link to="#" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
        <Link to="#" className="list-group-item list-group-item-action bg-light">Shortcuts</Link>
        <Link to="#" className="list-group-item list-group-item-action bg-light">Overview</Link>
        <Link to="#" className="list-group-item list-group-item-action bg-light">Events</Link>
        <Link to="#" className="list-group-item list-group-item-action bg-light">Profile</Link>
        <Link to="#" className="list-group-item list-group-item-action bg-light">Status</Link>
      </div>
    </div>

    <div id="page-content-wrapper">

      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Link</Link>
            </li>
            <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="falseLink">
                Dropdown
              </Link>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">Action</Link>
                <Link className="dropdown-item" to="#">Another action</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#">Something else here</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <h1 className="mt-4">Simple Sidebar</h1>
        <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
      </div>
    </div>
  </div>
   );
  }
}
 
export default AdminHome;
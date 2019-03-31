import React, { Component } from 'react';

class UserListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {  }


  }
  render() { 
    const { index, user} = this.props
    // console.log(this.props)
    return ( 
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td><button onClick={() => this.props.editUser(user._id)}>Edit</button></td>
        <td><button onClick={() => this.props.deleteUser(user._id)}>Delete</button></td>
      </tr>
     );
  }
}
 
export default UserListElement;
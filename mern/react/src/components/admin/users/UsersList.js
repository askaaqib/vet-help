import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from '../SideBar';
import { getAllUsers } from '../../../actions/admin/userActions';
import UserListElement from './UserListElement';
import Pagination from "react-js-pagination";
import { withRouter } from 'react-router'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: null,
			totalItemsCount: null
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  
  handlePageChange(pageNumber) {
		this.props.getAllUsers(pageNumber)
  }
  
  componentDidMount() {
		if(!this.props.auth.isAuthenticated && this.props.auth.roles !== 'admin') {
			this.props.history.push('/login');
    }
    this.props.getAllUsers(1)
  }

  componentWillReceiveProps(props) {
		if (props) {
      console.log('nextprops', props)
			var currentPage = props.users.userList.current
			var totalPages = props.users.userList.pages
			if (currentPage && totalPages) {
				this.setState({
					activePage: currentPage,
					totalItemsCount: totalPages
				})
			}
		}
  }
  
  editUser(id) {
    // console.log(id, 'hi')
  }

  deleteUser(id) {
    // console.log(id, 'hiiii')
  }
  
  render() { 
    console.log(this.props)
    const { users } = this.props
    function UserList(props){
      const users  = props.users.users
      console.log('users', users)
      if (users && users.length > 0 ) {
        const listUsers = users.map((user,index) => {
          return (
            <UserListElement index={ index } key={ index } user={ user }/>
          )
        });
        return (
          <table className="table table-bordered table-hover bg-white" width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            { listUsers }  
            </tbody>
            <tfoot>
            </tfoot>
          </table>
        )
        } else {
          return (
            <table className="table table-bordered table-hover bg-white" width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td className="text-center" colspan="5">No User Found</td>
              </tr>  
              </tbody>
            </table>
          )
        }
    }
    return ( 
      <div>
        <div className="d-flex" id="wrapper">
          <SideBar />
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <h1 className="mt-4">User List</h1>
               <div className="">
                <div className=" mt-5">
                <UserList users={ users.userList }/>
                <Pagination
                  activePage={ this.state.activePage }
                  itemsCountPerPage={ 1 }
                  totalItemsCount={ this.state.totalItemsCount }
                  pageRangeDisplayed={5}
                  prevPageText="Previous"
                  nextPageText="Next"
                  onChange={ this.handlePageChange }
                  innerClass="pagination"
                  itemClass="page-item"
                  linkClass="page-link"
                />
                  {/* <div className="requests">
                  { userList && userList.length > 0 &&
                    <table className="table table-bordered table-hover bg-white" width="100%">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                  {userList && userList.length > 0 && userList.map((user, index) => {
                    return(
                      <UserListElement 
                        editUser={this.editUser} 
                        deleteUser={this.deleteUser}
                        index={index} 
                        key={index} 
                        user={user} 
                      />
                    )
                      }) 
                  }
                  </tbody>
                  </table>
                  }
                  </div> */}
                  <div className="card dash-main-card">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
UserList.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
  errors: state.errors
})

export  default withRouter(connect(mapStateToProps, { getAllUsers })(UserList))

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from '../SideBar';
import { getAllRequests } from '../../../actions/admin/requests';
import RequestListElement from './RequestListElement';
import RequestHelp from '../../requestHelp'


class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatDialog: false
    }
    this.startChat = this.startChat.bind(this);
  }

  componentDidMount() {
		if(!this.props.auth.isAuthenticated && this.props.auth.roles !== 'admin') {
			this.props.history.push('/login');
    }
    this.props.getAllRequests()
  }

  startChat (user_id){
    console.log('user', user_id)
    this.setState({ showChatDialog: true })
    this.clickChild(user_id)
    // console.log(id, 'hi')
  }

  deleteRequest(id) {
    // console.log(id, 'hiiii')
  }
  
  render() { 
    // console.log(this.props)
    const  { requestList, totalpage } = this.props.requests;
    const { showChatDialog } = this.state
    return ( 
      <div>
        <div className="d-flex" id="wrapper">
          <SideBar />
            <RequestHelp setClick={click => this.clickChild = click} />
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <h1 className="mt-4">Request List</h1>
               <div className="">
                <div className=" mt-5">
                  <div className="requests">
                  { requestList.length > 0 &&
                    <table className="table table-bordered table-hover bg-white" width="100%">
                    <thead>
                      <tr>
                        <th>Requested By</th>
                        <th>Pet Name</th>
                        <th>Problem</th>
                        <th>Problem Duration</th>
                        <th>Eating</th>
                        <th>Weight</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                  {requestList.length > 0 && requestList.map((request, index) => {
                    return(
                      <RequestListElement 
                        startChat={ this.startChat } 
                        deleteRequest={this.deleteRequest}
                        index={index} 
                        key={index} 
                        request={request} 
                      />
                    )
                      }) 
                  }
                  </tbody>
                  </table>
                  }
                  </div>
                  <div className="card dash-main-card">
                    {
                      totalpage !== null && 
                      <div>
                        {Array.from({ length: totalpage }, (v, k) => <button key={k+1}>{k+1}</button>)}
                      </div>
                    }
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
 
RequestList.propTypes = {
  getAllRequests: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  requests: state.requests,
  auth: state.auth,
  errors: state.errors
})

export  default connect(mapStateToProps, { getAllRequests })(RequestList)

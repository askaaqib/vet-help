import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadNotes } from '../../../actions/admin/requests';

class CaseNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null
    }

    this.uploadCaseNotes = this.uploadCaseNotes.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })	
  }
  
  uploadCaseNotes() {
		var form = new FormData();
    const { requestDetails} = this.props
    form.append("id", requestDetails._id);
    form.append("notes", this.state.notes);
    this.props.uploadNotes(form)
  }
  render() { 
    const { requestDetails} = this.props
    return (
      <div>
        { requestDetails &&
          (
            <div>
              <h4>Take Case Notes</h4>
              <textarea
                rows="16"
                cols="80"
                onChange={ this.handleInputChange }
                name="notes"
              ></textarea>
              <button onClick={ this.uploadCaseNotes }className="btn btn-primary">Upload Notes</button>
            </div>
          )
        }
      </div>
     );
  }
}

CaseNotes.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pets: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  pets: state.pets
})

export  default connect(mapStateToProps, { uploadNotes })(CaseNotes)

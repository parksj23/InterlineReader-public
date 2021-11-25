import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { sendLinkToResetPassword } from '../../actions/KORN410/auth';
import '../auth/style/auth.css'

class ForgotPassword extends Component {
	state = {
		email: '',
    errors: {},
	};

  static getDerivedStateFromProps = (nextProps) => {
    if(nextProps.errors) {
      return { errors: nextProps.errors };
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
  	this.setState({
  		[name]: value,
  	});
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.sendLinkToResetPassword({ email: this.state.email }, this.props.history);
  }

	render() {
    const { email, errors } = this.state;

		return (
      <div className="auth" style={{height: "100vh"}}>
          <div className="auth-form-dark-overlay">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto" style={{ padding: '10% 10% 15% 10%'}}>
              <h1 className="display-4 text-center" style={{color: "white"}}>Recover password</h1>
                <p className="lead text-center" style={{color: "white"}}>Type in your email</p>
                <form noValidate onSubmit={this.onSubmit} >
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
                    <input onChange={this.onChange} type="submit" className="btn btn-info btn-block mt-4" style={{backgroundColor: '#3eb17f'}}/>
                </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
	}
}

ForgotPassword.propTypes = {
  sendLinkToResetPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ errors }) => ({ errors });

export default connect(mapStateToProps, { sendLinkToResetPassword })(ForgotPassword);

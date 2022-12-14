import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {loginUser} from '../../actions/KORN410/auth';
import TextFieldGroup from '../common/TextFieldGroup';
import './style/auth.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email_or_username: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard/KORN351');
        }
        if (Object.keys(this.props.errors).length !== 0) {
            //this.props.clearErrors();
        }
    }


    static getDerivedStateFromProps = (nextProps) => {
        if (nextProps.auth.isAuthenticated) {
            nextProps.history.push('/dashboard/KORN351');
        }
        if (nextProps.errors) {
            return {errors: nextProps.errors};
        }
    };

    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email_or_username: this.state.email_or_username,
            password: this.state.password
        };

        this.props.loginUser(userData);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="auth">
                <div className="auth-form-dark-overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto" style={{padding: '10% 10% 25% 10%'}}>
                                <h1 className="display-4 text-center" style={{color: "white"}}>Log In</h1>
                                <br/><br/>
                                <p className="lead text-center" style={{color: "white", fontWeight: "bold"}}>Sign in to
                                    your Interline Reader account</p>
                                <br/><br/>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        placeholder="Email Address or username"
                                        name="email_or_username"
                                        type="text"
                                        value={this.state.email_or_username}
                                        onChange={this.onChange}
                                        error={errors.email_or_username}
                                    />
                                    <TextFieldGroup
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <Link to="/login/forgot" className="medium" style={{color: 'mediumslateblue'}}>Forgot
                                        password</Link>
                                    <input onChange={this.onChange} type="submit"
                                           className="btn btn-info btn-block mt-4"
                                           style={{backgroundColor: '#339b6e'}}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    //clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser, /*clearErrors*/})(Login);

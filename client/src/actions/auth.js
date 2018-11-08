import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from '../constants/action-types';

export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			const { token } = res.data;

			localStorage.setItem('jwtToken', token);

			setAuthToken(token);

			const decoded = jwt_decode(token);

			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const sendLinkToResetPassword = ({ email }, history) => dispatch => {
	//dispatch(clearErrors);
	axios
		.post('/api/users/forgot_password', { email })
		.then(() => {
			history.push({
				pathname: '/success',
				state: {
					message: `Check out your email in order to complete changing password.
                 Be aware that sent link is valid only for 1 hour!`,
				},
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const sendEmailVerification = ({ id }, history) => dispatch => {
	axios
		.post(`/api/users/register/send_email_verification/${id}`)
		.then(() => {
			history.push({
				pathname: '/success',
				state: {
					message: `Email verification send. Check out your email in order to complete verifing. If you don't see email, check your SPAM section.`,
				},
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
export const checkURL = ({ id, token }) => dispatch => {
	axios.get(`/api/users/reset_password/${id}/${token}`).catch(err =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		})
	);
};

export const resetPassword = (
	{ id, token, password, password2 },
	history
) => dispatch => {
	//dispatch(clearErrors);
	axios
		.put(`/api/users/reset_password/${id}/${token}`, { password, password2 })
		.then(() => {
			history.push('/login');
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const checkEmailVerUrl = ({ id, token }) => dispatch => {
	axios
		.get(`/api/users/register/verify_email/${id}/${token}`)
		.then(res => {
			const { token } = res.data;

			localStorage.setItem('jwtToken', token);

			setAuthToken(token);

			const decoded = jwt_decode(token);

			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const logoutUser = () => dispatch => {
	localStorage.clear();
	//localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};

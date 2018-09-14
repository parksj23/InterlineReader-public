const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateEmailInput = data => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEmailInput;

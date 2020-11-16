// register.js

const Validator = require('validator');
const isEmpty = require('../../helpers/validation/is-empty');

const validateRegisterInput = (data) => {
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';

    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = 'First name is required';
    }

    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Last name is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput;
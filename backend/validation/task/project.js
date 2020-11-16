const Validator = require('validator');
const isEmpty = require('../../helpers/validation/is-empty');

const validateTaskInput = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateTaskInput;
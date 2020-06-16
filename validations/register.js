const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.fName = validText(data.fName) ? data.fName : '';
    data.lName = validText(data.lName) ? data.lName : '';
    data.email = validText(data.email) ? data.email : '';
    data.dob = validText(data.dob) ? data.dob : '';
    data.gender = validText(data.gender) ? data.gender : '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isLength(data.fName, { min: 1 })){
        errors.fName = 'First name must be at least 1 character';
    }

    if (!Validator.isLength(data.lName, { min: 1 })){
        errors.lName = 'Last name must be at least 1 character';
    }

    if (Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })){
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender field is required';
    }

    if(data.password !== data.password2 || data.password2 === '') {
        errors.password2 = 'Password must match'
    }

    if (Validator.isEmpty(data.dob)){
        errors.dob = 'Date of birth is required';
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}
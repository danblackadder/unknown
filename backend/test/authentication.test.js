
const assert = require('assert');
const isEmpty = require('../helpers/validation/is-empty');
const validateRegisterInput = require('../validation/authentication/register');
const validateLoginInput = require('../validation/authentication/login');
const generatePassword = require('../helpers/authentication/generatePassword');


describe('Authentication', () => {

	describe('isEmpty', () => {
		it('should return true if value is undefined', () => {
			let actual = isEmpty(undefined);

			let expected = true;

			assert.equal(actual, expected);
		}),

		it('should return true if value is null', () => {
			let actual = isEmpty(null);

			let expected = true;

			assert.equal(actual, expected);
		}),

		it('should return true if object is length 0', () => {
			let actual = isEmpty({});

			let expected = true;

			assert.equal(actual, expected);
		}),

		it('should return true if string is length 0', () => {
			let actual = isEmpty('');

			let expected = true;

			assert.equal(actual, expected);
		})

	}),

	describe('validateRegisterInput', () => {
		it('should error if forename is empty', () => {
			let data = {
				forename: '',
				surname: 'test',
				email: 'test@test.com'
			};

			let actual = validateRegisterInput(data).errors.forename;

			let expected = 'Forename is required';

			assert.equal(actual, expected);
		}),

		it('should error if surname is empty', () => {
			let data = {
				forename: 'test',
				surname: '',
				email: 'test@test.com'
			};

			let actual = validateRegisterInput(data).errors.surname;

			let expected = 'Surname is required';

			assert.equal(actual, expected);
		}),

		it('should error if email is empty', () => {
			let data = {
				forename: 'test',
				surname: 'test',
				email: ''
			};

			let actual = validateRegisterInput(data).errors.email;

			let expected = 'Email is required';

			assert.equal(actual, expected);
		}),

		it('should error if email is not a valid email', () => {
			let data = {
				forename: 'test',
				surname: 'test',
				email: 'test'
			};

			let actual = validateRegisterInput(data).errors.email;

			let expected = 'Email is invalid';

			assert.equal(actual, expected);
		})

	}),

	describe('validateLoginInput', () => {
		it('should error if email is not a valid email', () => {
			let data = {
				email: 'test',
				password: 'password',
			};

			let actual = validateLoginInput(data).errors.email;

			let expected = 'Email is invalid';

			assert.equal(actual, expected);
		})

		it('should error if email is empty', () => {
			let data = {
				email: '',
				password: 'password',
			};

			let actual = validateLoginInput(data).errors.email;

			let expected = 'Email is required';

			assert.equal(actual, expected);
		}),

		it('should error if password is less than 6 characters', () => {
			let data = {
				email: 'test@test.com',
				password: 'test',
			};

			let actual = validateLoginInput(data).errors.password;

			let expected = 'Password must have at least 6 chars';

			assert.equal(actual, expected);
		}),

		it('should error if password is empty', () => {
			let data = {
				email: 'test@test.com',
				password: '',
			};

			let actual = validateLoginInput(data).errors.password;

			let expected = 'Password is required';

			assert.equal(actual, expected);
		})

	}),

	describe('generatePassword', () => {
		it('should generate a random password of 10 characters', () => {
			let password = generatePassword();

			let actualLength = password.length;
			let expectedLength = 10;

			assert.equal(actualLength, expectedLength);
		}),

		it ('should generate a random password of alphanumeric characters', () => {
			let password = generatePassword();

			let alpha = /\w/.test(password);
			let numeric = /\d/.test(password);

			assert.equal(alpha, numeric);

		})
	})
})
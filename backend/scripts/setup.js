console.log('Running setup script');

const fs = require('fs');
const inquirer = require('inquirer');
const crypto = require('crypto');

let questions = [
	{
		type: 'list',
		name: 'database',
		message: 'Which environment do you want to setup?',
		choices: ['DEVELOPMENT', 'PRODUCTION']
	},
	{
		type: 'input',
		name: 'email',
		message: 'Please confirm the email from:'
	},
	{
		type: 'password',
		name: 'password',
		message: 'Please confirm the email password:'
	},
	{
		type: 'input',
		name: 'host',
		message: 'Please confirm the email host:'
	},
	{
		type: 'input',
		name: 'domain',
		message: 'Please confirm the domain:'
	}
]

inquirer.prompt(questions).then(answers => {
	let db = answers.database === 'DEVELOPMENT' ? 'sandbox' : 'production';
	let email = answers.email;
	let password = answers.password;
	let host = answers.host;
	let domain = answers.domain;

	fs.copyFile('.env.example', '.env', (err) => {
	  if (err) throw err;
	  console.log('.env created from .env.example');
	  	crypto.randomBytes(48, (err, buffer) => {
			if (err) throw err;
			let token = buffer.toString('hex');
			fs.appendFile('.env', `\n\nDB=${db}\n\nEMAIL=${email}\nPASSWORD=${password}\nHOST=${host}\n\nSECRET=${token}\n\nDOMAIN=${domain}`, (err) => {
				if (err) throw err;
				console.log('.env updated for local environment.');
			})
		});
	});
})



console.log('Creating default root user');

const inquirer = require('inquirer');
const http = require('http')

let questions = [
	{
		type: 'input',
		name: 'email',
		message: 'Please confirm root user email'
	}
]

inquirer.prompt(questions).then(answers => {
	let email = answers.email;

	let data = JSON.stringify({
		forename: 'root',
		surname: 'root',
		email: email,
	})

	const options = {
	  hostname: 'localhost',
	  port: 5000,
	  path: '/users/register',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length
	  }
	}

	const req = http.request(options, (res) => {
	  console.log(`statusCode: ${res.statusCode}`)

	  res.on('data', (data) => {
	    console.log(`New root user created for ${email}, a password will be sent to ${email}`)
	  })
	})

	req.on('error', (error) => {
	  console.error(error)
	})

	req.write(data)
	req.end()
})


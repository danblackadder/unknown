const generator = require('generate-password');

const generatePassword = () => {
    let password = generator.generate({
        length: 10,
        numbers: true,
    });

    return password;
};

module.exports = generatePassword;
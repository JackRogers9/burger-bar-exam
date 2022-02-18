import GetDetails from '../Register/GetDetails';

const namePattern = /^[a-zA-Z]{3,15}$/;
const emailPattern = /[a-z0-9]+@[a-z]+.[a-z]{2,6}/;
const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-;:]).{8,}$/;

export const checkEmail = () => {
    const { email } = GetDetails();

    if (!email.match(emailPattern)) {
        document.getElementById('register-error').innerHTML = 'The email has an invalid format';
    } else {
        document.getElementById('register-error').innerHTML = '';
    }
};

export const checkPassword = () => {
    const { password } = GetDetails();

    if (!password.match(passwordPattern)) {
        document.getElementById('register-error').innerHTML =
            'The password is invalid. It needs to be 8+ characters and include at least one upper and lower case character, a number, and a symbol.';
    } else {
        document.getElementById('register-error').innerHTML = '';
    }
};

export const checkFirstName = () => {
    const { firstName } = GetDetails();

    if (!firstName.match(namePattern)) {
        document.getElementById('register-error').innerHTML = 'The first name is invalid';
    } else {
        document.getElementById('register-error').innerHTML = '';
    }
};

export const checkLastName = () => {
    const { lastName } = GetDetails();

    if (!lastName.match(namePattern)) {
        document.getElementById('register-error').innerHTML = 'The last name is invalid';
    } else {
        document.getElementById('register-error').innerHTML = '';
    }
};

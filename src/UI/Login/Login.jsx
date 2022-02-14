import Fields from '../InputFields/Fields';
import './Login.css';

const loginFields = [
    { label: 'Email', placeholder: 'Enter your email...', id: 'loginEmail' },
    {
        label: 'Password',
        placeholder: 'Enter your password...',
        id: 'loginPassword',
    },
];

export default function Login() {
    const login = async () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            }),
        };

        const response = await fetch('/login', requestOptions);
        const body = await response.json();

        if (body.message) {
            document.getElementById('incorrect').innerHTML = body.message;
        } else {
            window.location = '/';
        }
    };

    return (
        <div className="login-body">
            <h1 className="login-title"> Login </h1>

            <Fields fieldInformation={loginFields} />

            <button type="button" className="submit-button" onClick={login}>
                Log In
            </button>
        </div>
    );
}

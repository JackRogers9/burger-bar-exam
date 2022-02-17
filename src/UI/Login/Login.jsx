import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import Fields from '../InputFields/Fields';
import loginFields from './Fields.json';

export default function Login() {
    const login = async () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        };

        const response = await fetch('/login', requestOptions);
        const body = await response.json();

        if (body.message) {
            console.log(body.message);
            // document.getElementById('incorrect').innerHTML = body.message;
        } else {
            localStorage.setItem('token', body.token);
            window.location = '/';
        }
    };

    return (
        <ComponentBody header="Login">
            <Fields fieldInformation={loginFields} />

            <button
                type="button"
                className="submit-button"
                data-testid="login-button"
                onClick={login}
            >
                Log In
            </button>
        </ComponentBody>
    );
}

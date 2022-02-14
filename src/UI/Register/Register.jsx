import { Link } from 'react-router-dom';
import fieldInformation from './Fields.json';
import Fields from '../InputFields/Fields';
import GetDetails from './GetDetails';
import './Register.css';

export default function Register() {
    const registerNewUser = async () => {
        const userDetails = GetDetails();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...userDetails,
                cardNumber: 1000000000000000,
                sortCode: 100000,
                cvc: 100,
            }),
        };

        const response = await fetch('/registerNewUser', requestOptions);
        const body = await response.json();

        if (body.message) {
            console.log(body.message);
            // document.getElementById('incorrect').innerHTML = body.message;
        } else {
            window.location = '/login';
        }
    };

    return (
        <div className="register-body">
            <h1 className="register-title"> Register </h1>

            <Fields fieldInformation={fieldInformation} />

            <button type="button" className="submit-button" onClick={registerNewUser}>
                Submit
            </button>

            <Link to="/login" className="login-link">
                <h3 className="login-text"> Already have an account? Click here to sign in.</h3>
            </Link>
        </div>
    );
}

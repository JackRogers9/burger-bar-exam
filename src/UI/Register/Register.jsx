import { Link } from 'react-router-dom';

import fieldInformation from './Fields.json';
import Fields from '../InputFields/Fields';
import GetDetails from './GetDetails';
import './Register.css';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import { HeaderH3 } from '../ReusableComponents/Headers/Headers';

const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

const saveUsersCardDetails = async (userID) => {
    const requestOptions = {
        ...methodAndHeaders,
        body: JSON.stringify({ userID, cardNumber: 1000000000000000, sortCode: 100000, cvc: 100 }),
    };

    const response = await fetch('/saveCardDetails', requestOptions);
    const body = await response.json();

    console.log(body);
    window.location = '/login';
};

const registerNewUser = async () => {
    const userDetails = GetDetails();
    const userID = Math.floor(100000 + Math.random() * 900000);

    const requestOptions = {
        ...methodAndHeaders,
        body: JSON.stringify({ ...userDetails, userID }),
    };

    const response = await fetch('/registerNewUser', requestOptions);
    const body = await response.json();

    if (body.message) {
        console.log(body.message);
        // document.getElementById('incorrect').innerHTML = body.message;
    }

    saveUsersCardDetails(userID);
};

export default function Register() {
    return (
        <ComponentBody header="Register">
            <Fields fieldInformation={fieldInformation} />

            <button type="button" className="submit-button" onClick={registerNewUser}>
                Submit
            </button>

            <Link to="/login" className="login-link">
                <HeaderH3
                    className="login-text"
                    text="Already have an account? Click here to sign in."
                />
            </Link>
        </ComponentBody>
    );
}

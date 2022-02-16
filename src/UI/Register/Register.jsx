import { Link } from 'react-router-dom';

import ComponentPage from '../ReusableComponents/ComponentPage/ComponentPage';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import { HeaderH3 } from '../ReusableComponents/Headers/Headers';
import fieldInformation from './Fields.json';
import Fields from '../InputFields/Fields';
import GetDetails from './GetDetails';
import './Register.css';
import CardDetails from '../CardDetails/CardDetails';

const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

const saveUsersCardDetails = async (userID) => {
    const cardNumber = document.getElementById('cardNumber').value;
    const sortCode = document.getElementById('sortcode').value;
    const cvc = document.getElementById('cvc').value;

    const requestOptions = {
        ...methodAndHeaders,
        body: JSON.stringify({ userID, cardNumber, sortCode, cvc }),
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
        <ComponentPage>
            <ComponentBody header="Register">
                <Fields fieldInformation={fieldInformation} />

                <CardDetails />

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
        </ComponentPage>
    );
}

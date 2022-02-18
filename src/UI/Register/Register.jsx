import { Link } from 'react-router-dom';

import { HeaderH3, methodAndHeaders } from '../ReusableComponents/Headers/Headers';
import ComponentPage from '../ReusableComponents/ComponentPage/ComponentPage';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import CardDetails from '../CardDetails/CardDetails';
import Fields from '../InputFields/Fields';
import { registerFields } from './Fields';
import GetDetails from './GetDetails';
import './Register.css';

const saveUsersCardDetails = async (userID) => {
    const cardNumber = document.getElementById('cardNumber').value;
    const sortCode = document.getElementById('sortcode').value;
    const cvc = document.getElementById('cvc').value;

    const requestOptions = {
        ...methodAndHeaders,
        body: JSON.stringify({ userID, cardNumber, sortCode, cvc }),
    };

    await fetch('/saveCardDetails', requestOptions);
    window.location = '/login';
};

const registerNewUser = async () => {
    const userDetails = GetDetails();
    const userID = Math.floor(100000 + Math.random() * 900000);

    const requestOptions = {
        ...methodAndHeaders,
        body: JSON.stringify({ ...userDetails, userID }),
    };

    await fetch('/registerNewUser', requestOptions);
    saveUsersCardDetails(userID);
};

export default function Register() {
    return (
        <ComponentPage>
            <ComponentBody header="Register">
                <Fields fieldInformation={registerFields} />

                <CardDetails />

                <p className="register-error" id="register-error" />

                <button
                    type="button"
                    className="submit-button"
                    data-testid="register-button"
                    onClick={registerNewUser}
                >
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

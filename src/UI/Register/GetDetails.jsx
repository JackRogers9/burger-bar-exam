export default function GetDetails() {
    const email = document.getElementById('registerEmail').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const password = document.getElementById('registerPassword').value;
    const postcode = document.getElementById('postcode').value;
    const houseNumber = document.getElementById('houseNumber').value;
    const roadName = document.getElementById('roadName').value;

    return { email, firstName, lastName, password, postcode, houseNumber, roadName };
}

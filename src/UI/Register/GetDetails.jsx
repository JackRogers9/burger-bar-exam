export default function GetDetails() {
    const email = document.getElementById('registerEmail').value;
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const password = document.getElementById('registerPassword').value;

    return { email, firstName, lastName, password };
}

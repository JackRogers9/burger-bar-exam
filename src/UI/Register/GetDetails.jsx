export default function GetDetails() {
    const email = document.getElementById('registerEmail').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const password = document.getElementById('registerPassword').value;

    return { email, firstName, lastName, password };
}

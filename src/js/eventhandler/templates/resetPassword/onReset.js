export default function onReset(obj, app, event) {
    event.preventDefault();

    const {
        user
    } = app.util;

    // valdiateRegex(obj, errorDiv)
    const errorDiv = document.querySelector('.text-danger');
    if (!valdiateRegex(obj)) {
        showErros(errorDiv, 'PasswordMustMatchRegex')
        return;
    }
    if (!confirmPassword(obj)) {
        showErros(errorDiv, 'PasswordMustMatch')
        return;
    }
    alert('Task completed')
}

function showErros(errorDiv, error) {
    errorDiv.classList.remove('hidden');
    errorDiv.innerHTML = t(error);
}

function confirmPassword(obj) {
    const matchPasswords = obj.newPassword == obj.confirmPassword ? true : false
    return matchPasswords;
}

function valdiateRegex(obj) {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (regex.test(obj.newPassword)) {
        return true;
    } else if (regex.test(obj.newPassword)) {
        return true;
    } else {
        return false;
    }
}
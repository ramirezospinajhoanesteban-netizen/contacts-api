const EMAIL_REGEX =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact({ name, email }) {

    if (!name) {
        return 'Name requerido';
    }

    if (!EMAIL_REGEX.test(email)) {
        return 'Email inválido';
    }

    return null;
}

module.exports = {
    validateContact
};
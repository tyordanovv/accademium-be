import generatePassword from 'generate-password';

export function generateRandomPassword() {
    return generatePassword.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        strict: true
    });
}
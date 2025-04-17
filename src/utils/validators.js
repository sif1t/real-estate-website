export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validateRequired = (value) => {
    return value && value.trim() !== '';
};

export const validatePhoneNumber = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(String(phone));
};

export const validatePassword = (password) => {
    return password.length >= 6;
};
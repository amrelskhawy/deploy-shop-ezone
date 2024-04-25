
export const PhoneNoValidator = (phoneNumber) => {
    const libyanPhoneRegex = /^09(1|2|3|4)[0-9]{7}$/;

    return libyanPhoneRegex.test(phoneNumber);
}


export const validateRequired = (requiredInputs, orderData) => {
    for (const input of requiredInputs) {
        const value = orderData[input];
        if (typeof orderData[value] === 'object') {
            // Handles objects, checking if value.value is properly filled
            if (!value || value.value == null || value.value === "" || value.value === false) {
                return false;
            }
        } else {
            // Directly checks for null, empty string or "false" strings
            if (value == null || value === "" || value === false || value === "false") {
                return false;
            }
            // Check if the input is a phone number and validate it using PhoneNoValidator
            if (input.includes('Phone') && !PhoneNoValidator(value)) {
                return false;
            }
        }
    }
    return true;
};

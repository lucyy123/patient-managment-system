import crypto from 'crypto';
export const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Generates a 6-digit hex OTP
};

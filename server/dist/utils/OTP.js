import crypto from 'crypto';
import { config } from 'dotenv';
import twilio from 'twilio';
config();
export const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Generates a 6-digit hex OTP
};
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
export const sendOtp = async (userMobileNumber, otp, messageBody) => {
    try {
        const myNumber = process.env.TWILIO_MY_NUMBER;
        const message = await client.messages.create({
            body: messageBody, //*-------- Message content
            from: myNumber,
            to: `+91${userMobileNumber}` //*------ User's phone number 
        });
        console.log(`OTP sent to ${userMobileNumber}: ${message.sid}`);
    }
    catch (error) {
        console.error('Error sending OTP:', error);
    }
};
//

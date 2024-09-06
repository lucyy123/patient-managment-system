import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: [true,
            'Email already exist'
        ],
        validate: validator.default.isEmail,
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
        unique: [true, 'Phone Number already exist']
    },
    personalInfo: {
        dateofBirth: {
            type: Date
        },
        gender: {
            type: String
        },
        address: {
            type: String
        },
        occupation: {
            type: String
        },
        emergencyContName: {
            type: String,
        },
        emergencyContNumber: {
            type: String,
        }
    },
    medicalInfo: {
        primaryCarePhy: {
            type: String
        },
        insuranceProvider: {
            type: String
        },
        insurancePolicyNumber: {
            type: String
        },
        allergies: {
            type: [String]
        },
        currentMedications: {
            type: String
        },
        familyMedicalHistory: {
            type: String
        },
        userPastMedicalHistory: {
            type: String
        }
    },
    identification: {
        identificationType: {
            type: String
        },
        identificationNumber: {
            type: String
        },
        image: {
            type: String
        }
    }
}, { timestamps: true });
schema.virtual('age').get(function () {
    const today = new Date();
    const dob = this.personalInfo?.dateofBirth;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() > dob.getMonth() || (today.getMonth() === dob?.getMonth() && today.getDate() < dob?.getDate())) {
        age--;
    }
    return age;
});
export const User = mongoose.model("User", schema);

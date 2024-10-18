# Care Plus - MERN Stack Healthcare Appointment App

## Project Overview

**Care Plus** is a full-stack healthcare appointment booking system built with the MERN stack. This project aims to streamline the process of booking appointments between patients and physicians (admin). It allows patients to book appointments seamlessly, and physicians can manage their appointments and notify patients of updates via SMS.

The project focuses on creating a robust user authentication system with OTP verification, JWT-based access control, and implementing secure, protected routes for different user roles (patients and physicians). Additionally, Care Plus uses lazy loading and optimized SEO practices to ensure fast load times and a smooth user experience.

## Key Features

### Patient-Side Features:
- **Book Appointments**: Patients can easily book an appointment with a physician.
- **SMS Notifications**: Patients receive confirmation and updates on their appointments via SMS.
- **OTP Authentication**: A secure OTP verification process ensures the authenticity of patients.
- **Resend OTP**: Patients can request a new OTP if needed.
- **User-friendly Interface**: Intuitive design and loading indicators provide a seamless experience.

### Admin (Physician) Features:
- **Appointment Management**: Physicians can manage and update appointments.
- **SMS Updates**: After updating an appointment, patients are notified via SMS.
- **Admin Panel**: Physicians have access to protected routes and admin-specific functionality.

### Security and Performance:
- **JWT-based Authentication**: Secure login and access to protected routes.
- **Protected Routes**: Only authorized users can access sensitive areas of the app.
- **Lazy Loading**: Optimized for fast load times and better SEO performance.
- **Loading Indicators**: Enhanced user experience during API calls and data fetching.

---

## Skills & Technologies Used

This project demonstrates expertise in the following areas:

### Frontend:
- **React.js**: Building reusable components and managing state.
- **React Router**: Handling navigation between different pages.
- **Redux**: Efficient state management across the app.
- **Lazy Loading**: Improving SEO and load time by dynamically loading components.
- **CSS & Bootstrap**: Responsive design for an optimal user experience across devices.

### Backend:
- **Node.js** with **Express.js**: Building the RESTful API for the application.
- **MongoDB (Mongoose)**: Storing and managing patient and appointment data.
- **JWT (JSON Web Tokens)**: Securing user authentication and access control.
- **Twilio API**: Sending SMS notifications for OTP and appointment updates.
- **BCrypt**: Securely hashing passwords for user authentication.

### Additional Features:
- **OTP Verification**: Secure user onboarding and authentication.
- **Resend OTP**: Handling OTP expiry and resending logic.
- **Protected Routes**: Implementing role-based access control (patients vs. admins).
- **SEO Optimized**: Using lazy loading and optimized performance for better SEO ranking.

---

## Project Summary

**Key Challenges**: 
- Implementing role-based authentication (patient vs. admin).
- Managing real-time appointment updates via SMS notifications.
- Ensuring security in user data with JWT and OTP verification.

**Solution Highlights**:
- Successfully created a two-step authentication process using OTP and JWT, ensuring both security and user convenience.
- Integrated Twilio API to handle real-time SMS updates, improving the overall user experience for appointment confirmations and updates.
- Used MongoDB to handle complex queries for appointment management and ensure scalability for future users.

---

## Demo & Installation

### Live Demo:
[Deployed Link](www.google.com)

### Installation Guide:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/care-plus.git
   cd care-plus

2. Install the dependencies for 
  Frontend
    ```bash
   cd client
   npm install
    ```
  Backend:
   ```bash
   cd server
   npm install
```
3.Set up environment variables.
4.Run both the frontend and backend:
  Frontend
    ```bash
   npm run dev
    ```
  Backend:
   ```bash
   npm run dev
```

### Contact:
 If you have any questions or want to discuss further, feel free to reach out at:.

- **Email**:monisykhan@gmail.com.
- **LinkedIn**: www.linkedin.com/in/Moniskhan1999.




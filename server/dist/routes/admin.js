import express from 'express';
import { adminAuthenticaton, allAppointments, getAllAdmins, logoutAdmin } from '../controllers/admin.js';
const app = express.Router();
//* end point  api/v1/admin/verify
app.post('/verify', adminAuthenticaton);
//* end point  api/v1/admin/logout
app.get('/logout', logoutAdmin);
//* end point  api/v1/admin/get/all
app.get('/get/all', getAllAdmins);
//* end point  api/v1/admin/get/all/appoint/doctorID
app.get('/get/all/appoint/:id', allAppointments);
export default app;

import express from 'express';
import { adminAuthenticaton, logoutAdmin } from '../controllers/admin.js';
const app = express.Router();
//* end point  api/v1/admin/verify
app.post('/verify', adminAuthenticaton);
//* end point  api/v1/admin/logout
app.post('/logout', logoutAdmin);
export default app;

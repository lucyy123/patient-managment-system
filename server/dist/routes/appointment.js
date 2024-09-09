import express from "express";
import { newAppointment, updateAppointment } from "../controllers/appointment.js";
import { AdminOnly, authenticated } from './../middlewares/auth.js';
const app = express.Router();
//*     end point :-/api/v1/appointment/new
app.post('/new', authenticated, newAppointment);
//* [A D M I N  O N L Y]      end point :- /api/v1/appointment/update/AppointmentID
app.route('/update/:id').put(authenticated, AdminOnly, updateAppointment);
export default app;

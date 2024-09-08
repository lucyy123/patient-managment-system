import express from "express";
import { newAppointment, updateAppointment } from "../controllers/appointment.js";

const app = express.Router();

//*     end point :-/api/v1/appointment/new
app.post('/new',newAppointment)


//* [A D M I N  O N L Y]      end point :- /api/v1/appointment/update/AppointmentID

app.route('/update/:id').put(updateAppointment)


export default app
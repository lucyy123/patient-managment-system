import express from 'express';
import { getUser, updateUser, userRegister, verifOTP } from '../controllers/user.js';
const app = express.Router();
//*     end point :- /api/v1/user/register/new
app.post('/register/new', userRegister);
//*     end point :- /api/v1/user/verify/new
app.post('/verify/new', verifOTP);
//*     end point  PUT :- /api/v1/user/UserId
//*     end point  GET :- /api/v1/user/UserId
app.route('/:id').put(updateUser).get(getUser);
export default app;

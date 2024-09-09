import express from 'express';
import { getUser, updateUser, userRegister, verifOTP } from '../controllers/user.js';
import { authenticated } from '../middlewares/auth.js';
const app = express.Router();
//*     end point :- /api/v1/user/register/new
app.post('/register/new', userRegister);
//*     end point :- /api/v1/user/verify/new
app.post('/verify/new', verifOTP);
//*     end point  PUT :- /api/v1/user/update
app.put('/update', authenticated, updateUser);
//*     end point  GET :- /api/v1/user/get
app.get('/get', authenticated, getUser);
export default app;

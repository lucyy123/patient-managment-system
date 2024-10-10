import express from 'express';
import { getUser, loginUser, logoutUser, updateUser, userRegister, verifOTP } from '../controllers/user.js';
import { authenticated } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';



const app = express.Router();

//*     end point :- /api/v1/user/register/new
app.post('/register/new',userRegister)


//*     end point :- /api/v1/user/verify/new
app.post('/verify/new',verifOTP)


//*     end point  PUT :- /api/v1/user/update
app.put('/update',authenticated,singleUpload.single('image') ,updateUser)


//*     end point  GET :- /api/v1/user/get
app.get('/get',authenticated,getUser)


//*     end point  POST :- /api/v1/user/verify/phoneNumber
app.post('/verify/phoneNumber',loginUser)


//*     end point  POST :- /api/v1/user/logout
app.get('/logout',logoutUser)



export default app;
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename(req, file, callback) {
        const id = uuidv4();
        const fileExtenstioName = file.originalname.split('.').pop();
        const uniqueFileName = `${id}${fileExtenstioName}`;
        callback(null, uniqueFileName);
    },
});
export const singleUpload = multer({ storage });

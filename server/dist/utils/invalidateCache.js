import { myCache } from "../app.js";
export const invalidateCache = ({ user, appointment }) => {
    myCache.del('');
};

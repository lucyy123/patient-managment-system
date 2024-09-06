export const TryCatch = (fun) => {
    return (req, res, next) => {
        return Promise.resolve(fun(req, res, next)).catch((next));
    };
};

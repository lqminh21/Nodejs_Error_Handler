const catchErrorWrapper = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
};

const catchErrorWrapperPromise = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
}

const catchErrorWrapperArray = (fns) => {
    return fns.map(fn => catchErrorWrapperPromise(fn));
    // return fns.map(fn => catchErrorWrapperPromise((req, res, next) => fn(req, res, next)))
}


module.exports = {catchErrorWrapper, catchErrorWrapperArray};

// const catchErrorWrapperAsync = (fn) => {
//     return async (req, res, next) => {
//         try {
//             await fn(req, res, next);
//         } catch(e) {
//             next(error);
//         }
//     }
// };

// const catchErrorWrapperArray = (fns) => {
//     return fns.map(fn => (req, res, next) => {
//         fn(req, res, next).catch(err => next(err));
//     })
// }
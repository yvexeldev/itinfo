const Validators = require("../validations");

module.exports = function (validator) {
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`/${validator}/ is not exists`);
    return async function (req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(
                req.body
            );
            req.body = validated;
            next();
        } catch (err) {
            if (err.isJoi) {
                return res.error(400, {
                    message: err.message,
                    friendlyMsg: "Validation error",
                });
            }
            return res.error(500, {
                friendlyMsg: "Internal error",
            });
            // next();
        }
    };
};

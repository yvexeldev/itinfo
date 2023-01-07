const jwt = require("../services/JwtService");
const config = require("config");

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.error(400, { message: "imkonsizdaaa" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.error(400, { message: "token yo'q" });
        }
        const decodedData = await jwt.verifyAccess(token, config.get("secret"));
        if (!decodedData) {
            return res.error(400, { message: "invalid token" });
        }
        if (decodedData.admin_is_creator) {
            return next();
        }
        if (!decodedData.admin_is_active) {
            return res.error(400, { message: "activmas" });
        }
        next();
    } catch (error) {
        res.error(400, { message: error.message });
    }
};
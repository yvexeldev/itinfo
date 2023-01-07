const jwt = require("../services/JwtService");
const config = require("config");

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.error(400, { friendlyMsg: "imkonsizdaaa" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.error(400, { friendlyMsg: "token yo'q" });
        }
        const decodedData = await jwt.verifyAccess(token, config.get("secret"));
        if (!decodedData) {
            return res.error(400, { friendlyMsg: "invalid token" });
        }
        if (decodedData.admin_is_creator) {
            return next();
        }
        if (req.params.id != decodedData.id) {
            return res.error(400, { friendlyMsg: "ne vozmojno" });
        }

        if (!decodedData.admin_is_active) {
            return res.error(400, { friendlyMsg: "activmas" });
        }
        next();
    } catch (error) {
        return res.error(400, { friendlyMsg: "error da hullas" });
    }
};

const jwt = require("../services/JwtService");
const config = require("config");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.error(400, { friendlyMsg: "aylanib keling" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.error(400, { friendlyMsg: "aylanib keling2" });
        }
        const decodedData = jwt.verifyAccess(token, config.get("secret"));
        if (!decodedData) {
            return res.error(400, { friendlyMsg: "aylanib keling3" });
        }
        if (!decodedData.admin_is_creator) {
            return res.error(400, { friendlyMsg: "sizga ruhsat yo'q" });
        }
        next();
    } catch (error) {
        res.error(400, { friendlyMsg: "kishtee" });
    }
};

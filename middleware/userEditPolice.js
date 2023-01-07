const jwt = require("../services/JwtService");
const config = require("config");

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.error(400, { friendlyMsg: "user ro'yhatdan o'tmagan" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.error(400, { friendlyMsg: "user ro'yhatdan o'tmagan" });
        }
        [err, decodedData] = await to(
            jwt.verifyAccess(token, config.get("secret"))
        );
        if (err) {
            return res.error(400, { friendlyMsg: err.message });
        }
        if (!decodedData) {
            return res.error(400, {
                friendlyMsg: "user ro'yhatdan o'tmagan invalid token",
            });
        }
        if (req.params.id != decodedData.id) {
            return res.error(400, { friendlyMsg: "ruhsat yo'qligi anniq" });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.error(400, {
            friendlyMsg: "user ro'yhatdan o'tmagan or invalid token",
        });
    }
};

async function to(promise) {
    return promise
        .then((response) => [null, response])
        .catch((error) => [error]);
}

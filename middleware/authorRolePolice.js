const jwt = require("../services/JwtService");
const config = require("config");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next();
        }
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                return res.error(400, {
                    friendlyMsg: "Avtor ro'yhatdan o'tmagan1",
                });
            }
            const token = authorization.split(" ")[1];
            if (!token) {
                return res.error(400, {
                    friendlyMsg: "avtor ro'yhatdan o'tmagan 2",
                });
            }
            const { is_expert, authorRoles } = jwt.verifyAccess(
                token,
                config.get("secret")
            );
            let hasRole = false;
            authorRoles.forEach((authorRole) => {
                if (roles.includes(authorRole)) {
                    hasRole = true;
                }
            });
            if (!is_expert || !hasRole) {
                return res.error(400, {
                    friendlyMsg: "Sizga ruhsat etilmagan",
                });
            }
            next();
        } catch (error) {
            console.log(error);
            res.error(400, { friendlyMsg: "Avtor ro'yhatda o'tmagan3" });
        }
    };
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// const { emailValidator } = require("../validations/author.validator");
// const { userValidation } = require("../validations/user.validator");
const jwt = require("../services/JwtService");
const config = require("config");
const uuid = require("uuid");
const ApiError = require("../errors/ApiError");
const mailService = require("../services/mail.service");
const generator = require("generate-password");

const getUsers = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.ok(200, allUser);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};
const ForgetPassword = async (req, res) => {
    try {
        const email = req.body.user_email;
        const user = await User.findOne({ user_email: email });
        if (!user) {
            return res.error(400, {
                friendlyMsg: "Bu email royhatdan otmagansiz",
            });
        }
        const generatedPassword = generator.generate({
            length: 8,
            numbers: true,
        });
        const newHashedPassword = bcrypt.hashSync(generatedPassword, 7);
        await User.findOneAndUpdate(
            { user_email: email },
            { user_password: newHashedPassword }
        );
        mailService.sendForgetPassword(user.user_email, generatedPassword);
        return res.status(200).send({
            message:
                "Emailingizga Yangi parol bordi osha bilan kirishingiz mumkin )",
        });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid User id" });
        }
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.error(400, { friendlyMsg: "User  not found" });
        }
        res.ok(200, user);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        // const { error, value } = userValidation(req.body);
        // if (error) {
        //     console.log(error);
        //     return res.error(400, {
        //         friendlyMsg: error.details[0].friendlyMsg,
        //     });
        // }
        const { user_name, user_email, user_password, user_info, user_photo } =
            req.body;
        const user_activation_link = uuid.v4();
        const UserHashedPassword = bcrypt.hashSync(user_password, 7);

        const newUser = await User({
            user_name,
            user_email,
            user_password: UserHashedPassword,
            user_info,
            user_photo,
            user_activation_link,
        });
        // await newUser.save();
        await mailService.sendActivationMail(
            user_email,
            `${config.get("api_url")}/user/activate/${user_activation_link}`
        );
        const payload = {
            id: newUser._id,
            user_is_active: newUser.user_is_active,
        };

        const tokens = jwt.generateTokens(payload);
        newUser.user_token = tokens.refreshToken;
        await newUser.save();
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });
        res.status(200).send({ ...tokens, user: payload });
    } catch (error) {
        ApiError.internal(res, {
            message: error,
            friendlyMsg: "Server Xatolik",
        });
    }
};
const userActivate = async (req, res) => {
    try {
        const user = await User.findOne({
            user_activation_link: req.params.link,
        });
        if (!user) {
            return res.error(400, { friendlyMsg: "user Topilmadi!" });
        }
        if (user.user_is_active) {
            return res.error(400, { friendlyMsg: "User allaqachon active" });
        }
        user.user_is_active = true;

        await user.save();
        res.ok(200, "user activated");
    } catch (err) {
        console.log(err);
    }
};
const editUser = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid User id" });
        }
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.error(400, { friendlyMsg: "User not found" });
        }
        const { error, value } = userValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { user_name, user_email, user_password, user_info, user_photo } =
            value;
        const UserHashedPassword = bcrypt.hashSync(user_password, 7);
        await User.updateOne(
            { _id: req.params.id },
            {
                user_name,
                user_email,
                user_password: UserHashedPassword,
                user_info,
                user_photo,
            }
        );
        res.ok(200, { friendlyMsg: "User updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid User id" });
        }
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.error(400, { friendlyMsg: "User not found" });
        }
        await User.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "User deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const user = await User.findOne({ user_email: user_email });

        if (!user) {
            return res.status(400).send({
                friendlyMsg: "User not found brat biz sizni tanimadik",
            });
        }
        const validPassword = bcrypt.compareSync(
            user_password,
            user.user_password
        );
        if (!validPassword) {
            return res.error(400, { friendlyMsg: "biz sizni topolmadik" });
        }
        const payload = {
            id: user.id,
            user_name: user.user_name,
        };
        const tokens = jwt.generateTokens(payload);
        user.user_token = tokens.refreshToken;
        await user.save();
        res.cookie("refreshToken2", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });

        res.ok(200, tokens);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const logOutUser = async (req, res) => {
    try {
        const { refreshToken2 } = req.cookies;

        let user;
        if (!refreshToken2) {
            return res.error(400, { friendlyMsg: "token topilmadi" });
        }
        user = await User.findOneAndUpdate(
            { user_token: refreshToken2 },
            { user_token: "" },
            { new: true }
        );
        if (!user) {
            return res.error(400, { friendlyMsg: "user not found" });
        }
        res.clearCookie("refreshToken2");
        res.ok(200, user);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const refreshUserToken = async (req, res) => {
    try {
        const { refreshToken2 } = req.cookies;
        if (!refreshToken2) {
            return res.error(400, { friendlyMsg: "token topilmadi" });
        }
        const userDataFromDB = await User.findOne({
            user_token: refreshToken2,
        });
        const userDataFromCookie = await jwt.verifyRefresh(refreshToken2);
        if (!userDataFromCookie || !userDataFromDB) {
            return res.error(400, { friendlyMsg: "user ro'yhatdan o'tmagan" });
        }
        const user = await User.findById(userDataFromCookie.id);
        if (!user) {
            return res.error(400, { friendlyMsg: "id notogri" });
        }
        const payload = {
            id: user.id,
            user_name: user.user_name,
        };
        const tokens = jwt.generateTokens(payload);
        user.user_token = tokens.refreshToken;
        await user.save();
        res.cookie("refreshToken2", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });
        res.ok(200, tokens);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser,
    loginUser,
    logOutUser,
    refreshUserToken,
    userActivate,
    ForgetPassword,
};

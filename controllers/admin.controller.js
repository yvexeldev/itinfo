const Admin = require("../models/Admin");
const { adminValidation } = require("../validations/admin.validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const config = require("config");
const generator = require("generate-password");

const { emailValidator } = require("../validations/author.validator");
const jwt = require("../services/JwtService");
const mailService = require("../services/mail.service");

const getAdmins = async (req, res) => {
    try {
        const allAdmin = await Admin.find({});
        res.ok(200, allAdmin);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};
const ForgetPassword = async (req, res) => {
    try {
        const email = req.body.admin_email;
        const admin = await Admin.findOne({ admin_email: email });
        if (!admin) {
            return res.error(400, {
                friendlyMsg: "Bu email royhatdan otmagansiz",
            });
        }
        const generatedPassword = generator.generate({
            length: 8,
            numbers: true,
        });
        const newHashedPassword = bcrypt.hashSync(generatedPassword, 7);
        await Admin.findOneAndUpdate(
            { admin_email: email },
            { admin_password: newHashedPassword }
        );
        mailService.sendForgetPassword(admin.admin_email, generatedPassword);
        return res.status(200).send({
            message:
                "Emailingizga Yangi parol bordi osha bilan kirishingiz mumkin )",
        });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};
const getAdmin = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid Admin id" });
        }
        const admin = await Admin.findOne({ _id: req.params.id });
        if (!admin) {
            return res.error(400, { friendlyMsg: "Admin  not found" });
        }
        res.ok(200, admin);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addAdmin = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const {
            admin_name,
            admin_email,
            admin_password,
            admin_is_active,
            admin_is_creator,
        } = value;

        const adminHashedPassword = bcrypt.hashSync(admin_password, 7);

        const newAdmin = await Admin({
            admin_name,
            admin_email,
            admin_password: adminHashedPassword,
            admin_is_active,
            admin_is_creator,
        });
        await newAdmin.save();
        res.ok(200, { message: "Admin added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editAdmin = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid Admin id" });
        }
        const admin = await Admin.findOne({ _id: req.params.id });
        if (!admin) {
            return res.error(400, { friendlyMsg: "Admin not found" });
        }
        const { error, value } = adminValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const {
            admin_name,
            admin_email,
            admin_password,
            admin_is_active,
            admin_is_creator,
        } = value;
        const adminHashedPassword = bcrypt.hashSync(admin_password, 7);
        await Admin.updateOne(
            { _id: req.params.id },
            {
                admin_name,
                admin_email,
                admin_password: adminHashedPassword,
                admin_is_active,
                admin_is_creator,
            }
        );
        res.ok(200, { message: "Admin updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid Admin id" });
        }
        const admin = await Admin.findOne({ _id: req.params.id });
        if (!admin) {
            return res.error(400, { friendlyMsg: "Admin not found" });
        }
        await Admin.deleteOne({ _id: req.params.id });
        res.error(400, { friendlyMsg: "Admin deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { admin_email, admin_password } = req.body;
        const { error } = emailValidator({ login: admin_email });
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const admin = await Admin.findOne({ admin_email: admin_email });

        if (!admin) {
            return res.error(400, {
                friendlyMsg: "Admin not found brat biz sizni tanimadik",
            });
        }
        const validPassword = bcrypt.compareSync(
            admin_password,
            admin.admin_password
        );
        if (!validPassword) {
            return res.error(400, { friendlyMsg: "biz sizni topolmadik" });
        }

        const payload = {
            id: admin.id,
            admin_is_active: admin.admin_is_active,
            admin_is_creator: admin.admin_is_creator,
        };
        const tokens = jwt.generateTokens(payload);
        admin.admin_token = tokens.refreshToken;
        await admin.save();
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });

        res.ok(200, tokens);
    } catch (err) {
        res.error(400, { friendlyMsg: err.message });
    }
};

const logOutAdmin = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        let admin;
        if (!refreshToken) {
            return res.error(400, { friendlyMsg: "token topilmadi" });
        }
        admin = await Admin.findOneAndUpdate(
            { admin_token: refreshToken },
            { admin_token: "" },
            { new: true }
        );
        if (!admin) {
            return res.error(400, { friendlyMsg: "admin not found" });
        }
        res.clearCookie("refreshToken");
        res.ok(200, admin);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const refreshAdminToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.error(400, { friendlyMsg: "token topilmadi" });
        }
        const adminDataFromDB = await Admin.findOne({
            admin_token: refreshToken,
        });
        const adminDataFromCookie = await jwt.verifyRefresh(refreshToken);
        if (!adminDataFromCookie || !adminDataFromDB) {
            return res.error(400, { friendlyMsg: "admin ro'yhatdan o'tmagan" });
        }
        const admin = await Admin.findById(adminDataFromCookie.id);
        if (!admin) {
            return res.error(400, { friendlyMsg: "id notogri" });
        }
        const payload = {
            id: admin.id,
            admin_is_active: admin.admin_is_active,
            admin_is_creator: admin.admin_is_creator,
        };
        const tokens = jwt.generateTokens(payload);
        admin.admin_token = tokens.refreshToken;
        await admin.save();
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });

        res.ok(200, tokens);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getAdmins,
    getAdmin,
    addAdmin,
    editAdmin,
    deleteAdmin,
    loginAdmin,
    logOutAdmin,
    refreshAdminToken,
    ForgetPassword,
};

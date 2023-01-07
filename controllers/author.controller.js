const mongoose = require("mongoose");
const Author = require("../models/Author");
const jwt = require("../services/JwtService");
const config = require("config");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const {
    authorValidation,
    phoneValidator,
    emailValidator,
} = require("../validations/author.validator");
const mailService = require("../services/mail.service");
const uuid = require("uuid");
const getAuthors = async (req, res) => {
    try {
        const allAuthor = await Author.find({});
        res.ok(200, allAuthor);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const authorActivate = async (req, res) => {
    try {
        const author = await Author.findOne({
            author_activation_link: req.params.link,
        });
        if (!author) {
            return res.error(400, { friendlyMsg: "Author Topilmadi!" });
        }
        if (author.author_is_active) {
            return res.error(400, { friendlyMsg: "Author allaqachon active" });
        }
        author.author_is_active = true;

        await author.save();
        res.ok(200, "author activated");
    } catch (err) {
        console.log(err);
    }
};

const ForgetPassword = async (req, res) => {
    try {
        const email = req.body.author_email;
        const author = await Author.findOne({ author_email: email });
        if (!author) {
            return res.error(400, {
                friendlyMsg: "Bu email royhatdan otmagansiz",
            });
        }
        const generatedPassword = generator.generate({
            length: 8,
            numbers: true,
        });
        const newHashedPassword = bcrypt.hashSync(generatedPassword, 7);
        await Author.findOneAndUpdate(
            { author_email: email },
            { author_password: newHashedPassword }
        );
        mailService.sendForgetPassword(author.author_email, generatedPassword);
        return res.status(200).send({
            message:
                "Emailingizga Yangi parol bordi osha bilan kirishingiz mumkin )",
        });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};
const getAuthor = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid Author id" });
        }
        const author = await Author.findOne({ _id: req.params.id });
        if (!author) {
            return res.error(400, { friendlyMsg: "Author  not found" });
        }
        res.ok(200, author);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addAuthor = async (req, res) => {
    try {
        const {
            author_first_name,
            author_last_name,
            author_nick_name,
            author_email,
            author_phone,
            author_password,
            author_info,
            author_position,
            author_photo,
            is_expert,
        } = req.body;
        const author_activation_link = uuid.v4();
        const authorHashedPassword = bcrypt.hashSync(author_password, 7);

        const newAuthor = await Author({
            author_first_name,
            author_last_name,
            author_nick_name,
            author_email,
            author_phone,
            author_password: authorHashedPassword,
            author_info,
            author_position,
            author_photo,
            is_expert,
            author_activation_link,
        });
        await mailService.sendActivationMail(
            author_email,
            `${config.get("api_url")}/author/activate/${author_activation_link}`
        );
        const payload = {
            id: newAuthor._id,
            author_is_active: newAuthor.author_is_active,
        };

        const tokens = jwt.generateTokens(payload);
        newAuthor.author_token = tokens.refreshToken;
        await newAuthor.save();
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });
        res.status(200).send({ ...tokens, author: payload });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editAuthor = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid Author id" });
        }
        const author = await Author.findOne({ _id: req.params.id });
        if (!author) {
            return res.error(400, { friendlyMsg: "Author not found" });
        }
        const { err, value } = authorValidation(req.body);
        if (err) {
            return res.error(400, { friendlyMsg: err.details[0].message });
        }
        const {
            author_first_name,
            author_last_name,
            author_nick_name,
            author_email,
            author_phone,
            author_password,
            author_info,
            author_position,
            author_photo,
            is_expert,
        } = value;
        let expert;
        if (is_expert) {
            expert = true;
        } else {
            expert = false;
        }
        const authorHashedPassword = bcrypt.hashSync(author_password, 7);

        await Author.updateOne(
            { _id: req.params.id },
            {
                author_first_name,
                author_last_name,
                author_nick_name,
                author_email,
                author_phone,
                author_password: authorHashedPassword,
                author_info,
                author_position,
                author_photo,
                is_expert,
            }
        );
        res.ok(200, { friendlyMsg: "Author updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid Author id" });
        }
        const author = await Author.findOne({ _id: req.params.id });
        if (!author) {
            return res.error(400, { friendlyMsg: "Author not found" });
        }
        await Author.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Author deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const loginAuthor = async (req, res) => {
    try {
        const { login, password } = req.body;
        let author;
        const { error } = phoneValidator({ login });
        if (error) {
            const { error } = emailValidator({ login });
            if (error) {
                author = await Author.findOne({ author_nick_name: login });
            } else {
                author = await Author.findOne({ author_email: login });
            }
        } else {
            author = await Author.findOne({ author_phone: login });
        }
        if (!author) {
            return res.error(400, {
                friendlyMsg: "author not found brat biz sizni tanimadik",
            });
        }
        const validPassword = bcrypt.compareSync(
            password,
            author.author_password
        );
        if (!validPassword) {
            return res.error(400, {
                friendlyMsg: "biz sizni topolmadik",
            });
        }

        const payload = {
            id: author.id,
            author_is_active: author.author_is_active,
        };
        const tokens = jwt.generateTokens(payload);
        author.author_token = tokens.refreshToken;
        await author.save();
        res.cookie("refreshToken1", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });

        res.ok(200, tokens);
    } catch (err) {
        res.error(400, { friendlyMsg: err.message });
    }
};

const logOutAuthor = async (req, res) => {
    try {
        const { refreshToken1 } = req.cookies;

        let author;
        if (!refreshToken1) {
            return res.error(400, { friendlyMsg: "token topilmadi" });
        }
        author = await Author.findOneAndUpdate(
            { author_token: refreshToken1 },
            { author_token: "" },
            { new: true }
        );
        if (!author) {
            return res.error(400, { friendlyMsg: "author not found" });
        }
        res.clearCookie("refreshToken1");
        res.ok(200, author);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const refreshAuthorToken = async (req, res) => {
    try {
        const { refreshToken1 } = req.cookies;
        if (!refreshToken1) {
            return res.error(400, { friendlyMsg: "token topilmadi" });
        }
        const authorDataFromDB = await Author.findOne({
            author_token: refreshToken1,
        });
        const authorDataFromCookie = await jwt.verifyRefresh(refreshToken1);
        if (!authorDataFromCookie || !authorDataFromDB) {
            return res.error(400, {
                friendlyMsg: "author ro'yhatdan o'tmagan",
            });
        }
        const author = await Author.findById(authorDataFromCookie.id);
        if (!author) {
            return res.error(400, { friendlyMsg: "id notogri" });
        }
        const payload = {
            id: author.id,
            author_is_active: author.author_is_active,
        };
        const tokens = jwt.generateTokens(payload);
        author.author_token = tokens.refreshToken;
        await author.save();
        res.cookie("refreshToken1", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });

        res.ok(200, tokens);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};
module.exports = {
    getAuthors,
    getAuthor,
    addAuthor,
    editAuthor,
    deleteAuthor,
    loginAuthor,
    logOutAuthor,
    refreshAuthorToken,
    authorActivate,
    ForgetPassword,
};

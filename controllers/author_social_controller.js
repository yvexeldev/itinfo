const mongoose = require("mongoose");
const Author = require("../models/Author");
const Author_Social = require("../models/Author_Social");
const Social = require("../models/Social");
const {
    author_socialValidation,
} = require("../validations/author_social.validator");

const getAuthor_Socials = async (req, res) => {
    try {
        const allAuthor_Social = await Author_Social.find({});
        res.ok(200, allAuthor_Social);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getAuthor_Social = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid Author_Social id" });
        }
        const author_Social = await Author_Social.findOne({
            _id: req.params.id,
        });
        if (!author_Social) {
            return res.error(400, { friendlyMsg: "Author_Social topilmadi" });
        }
        res.ok(200, author_Social);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addAuthor_Social = async (req, res) => {
    try {
        const { error, value } = author_socialValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const { author_id, social_id, social_link } = value;
        if (!mongoose.isValidObjectId(author_id)) {
            return res.error(400, { friendlyMsg: "invalid author id" });
        }
        const author = await Author.findOne({ _id: author_id });
        if (!author) {
            return res.error(400, { friendlyMsg: "author not found" });
        }
        if (!mongoose.isValidObjectId(social_id)) {
            return res.error(400, { friendlyMsg: "invalid social id" });
        }
        const social = await Social.findOne({ _id: social_id });
        if (!social) {
            return res.error(400, { friendlyMsg: "social not found" });
        }
        const authorsocial = await Author_Social.findOne({
            author_id: author_id,
            social_id: social_id,
        });
        if (authorsocial) {
            return res.error(400, {
                friendlyMsg: "author_social already exists",
            });
        }
        const newAuthor_Social = await Author_Social({
            author_id,
            social_id,
            social_link,
        });
        await newAuthor_Social.save();
        res.ok(200, { friendlyMsg: "Author_Social added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editAuthor_Social = async (req, res) => {
    try {
        const { error, value } = author_socialValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const { author_id, social_id, social_link } = value;
        if (!mongoose.isValidObjectId(author_id)) {
            return res.error(400, { friendlyMsg: "invalid author id" });
        }
        const author = await Author.findOne({ _id: author_id });
        if (!author) {
            return res.error(400, { friendlyMsg: "author not found" });
        }
        if (!mongoose.isValidObjectId(social_id)) {
            return res.error(400, { friendlyMsg: "invalid social id" });
        }
        const social = await Social.findOne({ _id: social_id });
        if (!social) {
            return res.error(400, { friendlyMsg: "social not found" });
        }
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid request id" });
        }
        const author_social = await Author_Social.findOne({
            _id: req.params.id,
        });
        if (!author_social) {
            return res.error(400, { friendlyMsg: "Author_social not found" });
        }
        const authorsocial = await Author_Social.findOne({
            author_id: author_id,
            social_id: social_id,
        });
        if (authorsocial && authorsocial.id != req.params.id) {
            return res.error(400, {
                friendlyMsg: "author_social already exists",
            });
        }
        await Author_Social.updateOne(
            { _id: req.params.id },
            {
                author_id: author_id || author_social.author_id,
                social_id: social_id || author_social.social_id,
                social_link: social_link || author_social.social_link,
            }
        );
        res.ok(200, { friendlyMsg: "Author_social updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteAuthor_Social = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid request id" });
        }
        const author_Social = await Author_Social.findOne({
            _id: req.params.id,
        });
        if (!author_Social) {
            return res.error(400, { friendlyMsg: "Author_Social not found" });
        }
        await Author_Social.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Author social deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getAuthor_Socials,
    getAuthor_Social,
    addAuthor_Social,
    editAuthor_Social,
    deleteAuthor_Social,
};

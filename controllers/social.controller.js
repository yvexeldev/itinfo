const Social = require("../models/Social");
const mongoose = require("mongoose");
const { socialvalidation } = require("../validations/social.validator");

const getSocials = async (req, res) => {
    try {
        const allSocial = await Social.find({});
        res.ok(200, allSocial);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getSocial = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const social = await Social.findOne({ _id: req.params.id });
        if (!social) {
            return res.error(400, { friendlyMsg: "Social not found" });
        }
        res.ok(200, social);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addSocial = async (req, res) => {
    try {
        const { error, value } = socialvalidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].meaage });
        }

        const { social_name, social_icon_file } = value;
        const social = await Social.findOne({ social_name: social_name });
        if (social) {
            return res.error(400, { friendlyMsg: "social already exists" });
        }
        const newSocial = Social({
            social_name,
            social_icon_file,
        });
        await newSocial.save();
        res.ok(200, { friendlyMsg: "Social added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editSocial = async (req, res) => {
    try {
        const { error, value } = socialvalidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].meaage });
        }

        const { social_name, social_icon_file } = value;
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const social = await Social.findOne({ _id: req.params.id });
        if (!social) {
            return res.error(400, { friendlyMsg: "Social not found" });
        }
        const soci = await Social.findOne({ social_name: social_name });
        if (soci && soci.id != req.params.id) {
            return res.error(400, { friendlyMsg: "social already exists" });
        }
        await Social.updateOne(
            { _id: req.params.id },
            {
                social_name: social_name || social.social_name,
                social_icon_file: social_icon_file || social.social_icon_file,
            }
        );
        res.ok(200, { friendlyMsg: "Social updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteSocial = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const social = await Social.findOne({ _id: req.params.id });
        if (!social) {
            return res.error(400, { friendlyMsg: "Social topilmadi" });
        }
        await Social.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Social o'chirildi" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getSocials,
    getSocial,
    addSocial,
    editSocial,
    deleteSocial,
};

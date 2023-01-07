const Description = require("../models/Description");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const {
    descriptionValidation,
} = require("../validations/description.validator");

const getDescriptions = async (req, res) => {
    try {
        const allDescription = await Description.find({}).populate({
            path: "category_id",
            select: "category_name -_id",
        });
        res.ok(200, allDescription);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getDescription = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid dict id" });
        }
        const description = await Description.findOne({ _id: req.params.id });
        if (!description) {
            return res
                .status(404)
                .send({ friendlyMsg: "Description topilmadi" });
        }
        res.ok(200, description);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addDescription = async (req, res) => {
    try {
        const { error, value } = descriptionValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { category_id, description } = value;

        if (!mongoose.isValidObjectId(category_id)) {
            return res.error(400, { friendlyMsg: "invalid category id" });
        }
        if (!Category.findById(category_id)) {
            return res.error(400, { friendlyMsg: "category not found" });
        }

        const newDescription = await Description({
            category_id,
            description,
        });
        await newDescription.save();
        res.ok(200, { friendlyMsg: "Description added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editDescription = async (req, res) => {
    try {
        const { error, value } = descriptionValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { category_id, description } = value;

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const description1 = await Description.findOne({ _id: req.params.id });
        if (!description1) {
            return res.error(400, { friendlyMsg: "Description not found" });
        }
        if (!mongoose.isValidObjectId(category_id)) {
            return res.error(400, { friendlyMsg: "invalid category id" });
        }
        if (!Category.findById(category_id)) {
            return res.error(400, { friendlyMsg: "category not found" });
        }

        await Description.updateOne(
            { _id: req.params.id },
            {
                category_id,
                description,
            }
        );
        res.ok(200, { friendlyMsg: "description updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteDescription = async (req, res) => {
    try {
        const description = await Description.findOne({ _id: req.params.id });
        if (!description) {
            return res.error(400, { friendlyMsg: "Description not found" });
        }
        await Description.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Description deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getDescriptions,
    getDescription,
    addDescription,
    editDescription,
    deleteDescription,
};

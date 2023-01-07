const Category = require("../models/Category");
const Tag = require("../models/Tag");
const Topic = require("../models/Topic");
const mongoose = require("mongoose");
const { tagValidation } = require("../validations/tag.validator");

const getTags = async (req, res) => {
    try {
        const allTag = await Tag.find({});

        if (!allTag) {
            return res.error(400, { friendlyMsg: "Bo'mbosh " });
        }
        console.log(allTag);
        res.ok(200, allTag);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getTag = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const tag = await Tag.findOne({ _id: req.params.id });
        if (!tag) {
            return res.error(400, { friendlyMsg: "Tag not found" });
        }
        console.log(tag);
        res.ok(200, tag);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addTag = async (req, res) => {
    try {
        const { error, value } = tagValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const { topic_id, category_id } = value;
        const newTag = Tag({
            topic_id,
            category_id,
        });
        if (!mongoose.isValidObjectId(topic_id)) {
            return res.error(400, { friendlyMsg: "invalid topic id" });
        }
        const topic = await Topic.findOne({ _id: topic_id });
        if (!topic) {
            return res.error(400, { friendlyMsg: "author not found" });
        }
        if (!mongoose.isValidObjectId(category_id)) {
            return res.error(400, { friendlyMsg: "invalid category id" });
        }
        const category = await Category.findOne({ _id: category_id });
        if (!category) {
            return res.error(400, { friendlyMsg: "category not found" });
        }
        const tag = await Tag.findOne({
            topic_id: topic_id,
            category_id: category_id,
        });
        if (tag) {
            return res.error(400, { friendlyMsg: "tag already exists" });
        }
        await newTag.save();
        res.ok(200, { friendlyMsg: "Tag added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editTag = async (req, res) => {
    try {
        const { error, value } = tagValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const { topic_id, category_id } = value;
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const tag = await Tag.findOne({ _id: req.params.id });
        if (!tag) {
            return res.error(400, { friendlyMsg: "Tag not found" });
        }
        if (!mongoose.isValidObjectId(topic_id)) {
            return res.error(400, { friendlyMsg: "invalid topic id" });
        }
        const topic = await Topic.findOne({ _id: topic_id });
        if (!topic) {
            return res.error(400, { friendlyMsg: "author not found" });
        }

        if (!mongoose.isValidObjectId(category_id)) {
            return res.error(400, { friendlyMsg: "invalid category id" });
        }
        const category = await Category.findOne({ _id: category_id });
        if (!category) {
            return res.error(400, { friendlyMsg: "category not found" });
        }
        const tag2 = await Tag.findOne({
            topic_id: topic_id,
            category_id: category_id,
        });
        if (tag2) {
            return res.error(400, { friendlyMsg: "tag already exists" });
        }
        await Tag.updateOne(
            { _id: req.params.id },
            {
                topic_id: topic_id || tag.topic_id,
                category_id: category_id || tag.category_id,
            }
        );
        res.ok(200, { friendlyMsg: "Tag updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteTag = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const tag = await Tag.findOne({ _id: req.params.id });
        if (!tag) {
            return res.error(400, { friendlyMsg: "Tag not found" });
        }
        await Tag.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Tag deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};
module.exports = {
    getTags,
    getTag,
    addTag,
    editTag,
    deleteTag,
};

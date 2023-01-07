const Desc_Topic = require("../models/Desc_Topic");
const mongoose = require("mongoose");
const Description = require("../models/Description");
const Topic = require("../models/Topic");
const { desc_topicValidation } = require("../validations/desc_topic.validator");

const errorHandler = (res, error) => {
    res.status(500).send(error);
};

const getDesc_Topics = async (req, res) => {
    try {
        const allDesc_Topic = await Desc_Topic.find({});
        res.ok(200, allDesc_Topic);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getDesc_Topic = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const desc_Topic = await Desc_Topic.findOne({ _id: req.params.id });
        if (!desc_Topic) {
            return res.error(400, { friendlyMsg: "Desc_Topic not found" });
        }
        res.ok(200, desc_Topic);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addDesc_Topic = async (req, res) => {
    try {
        const { error, value } = desc_topicValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { desc_id, topic_id } = req.body;

        if (!mongoose.isValidObjectId(desc_id)) {
            return res.error(400, { friendlyMsg: "invalid desc id" });
        }
        const description = await Description.findOne({ _id: desc_id });
        if (!description) {
            return res.error(400, { friendlyMsg: "description not found" });
        }
        if (!mongoose.isValidObjectId(topic_id)) {
            return res.error(400, { friendlyMsg: "invalid topic id" });
        }
        const topic = await Topic.findOne({ _id: topic_id });
        if (!topic) {
            return res.error(400, { friendlyMsg: "topic not found" });
        }
        const desc_topic = await Desc_Topic.findOne({
            desc_id: desc_id,
            topic_id: topic_id,
        });
        if (desc_topic) {
            return res.error(400, { friendlyMsg: "desc_topic already exists" });
        }
        const newDesc_Topic = await Desc_Topic({
            desc_id,
            topic_id,
        });
        await newDesc_Topic.save();
        res.ok(200, { friendlyMsg: "Desc_Topic added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editDesc_Topic = async (req, res) => {
    try {
        const { error, value } = desc_topicValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { desc_id, topic_id } = req.body;

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const desc_Topic = await Desc_Topic.findOne({ _id: req.params.id });
        if (!desc_Topic) {
            return res.error(400, { friendlyMsg: "Desc_Topic not found" });
        }
        // const desc_id = req.body.desc_id || desc_Topic.desc_id;
        // const topic_id = req.body.topic_id || desc_Topic.topic_id;

        if (!mongoose.isValidObjectId(desc_id)) {
            return res.error(400, { friendlyMsg: "invalid desc _ id" });
        }
        if (!mongoose.isValidObjectId(topic_id)) {
            return res.error(400, { friendlyMsg: "invalid topic _ id" });
        }
        const description = await Description.findOne({ _id: desc_id });
        if (!description) {
            return res.error(400, { friendlyMsg: "description not found" });
        }
        const topic = await Topic.findOne({ _id: topic_id });
        if (!topic) {
            return res.error(400, { friendlyMsg: "topic not found" });
        }
        const desc_topic = await Desc_Topic.findOne({
            desc_id: desc_id,
            topic_id: topic_id,
        });
        if (desc_topic && desc_topic.id != req.params.id) {
            return res.error(400, { friendlyMsg: "desc_topic already exists" });
        }
        await Desc_Topic.updateOne(
            { _id: req.params.id },
            {
                desc_id,
                topic_id,
            }
        );
        res.ok(200, { friendlyMsg: "Desc_Topic updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteDesc_Topic = async (req, res) => {
    try {
        const desc_topic = await Desc_Topic.findOne({ _id: req.params.id });
        if (!desc_topic) {
            return res.error(400, { friendlyMsg: "Desc_Topic not found" });
        }
        await Desc_Topic.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Desc_Topic deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getDesc_Topics,
    getDesc_Topic,
    addDesc_Topic,
    editDesc_Topic,
    deleteDesc_Topic,
};

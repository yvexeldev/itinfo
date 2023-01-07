const Author = require("../models/Author");
const Topic = require("../models/Topic");
const mongoose = require("mongoose");
const { topicValidation } = require("../validations/topic.validator");

const getTopics = async (req, res) => {
    try {
        const allTopic = await Topic.find({});
        res.ok(200, allTopic);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getTopic = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const topic = await Topic.findOne({ _id: req.params.id });
        if (!topic) {
            return res.error(400, { friendlyMsg: "Topic not found" });
        }
        res.ok(200, topic);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addTopic = async (req, res) => {
    try {
        const { error, value } = topicValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const {
            author_id,
            topic_title,
            topic_text,
            is_checked,
            is_approwed,
            expert_id,
        } = value;
        if (!mongoose.isValidObjectId(author_id)) {
            return res.error(400, { friendlyMsg: "invalid author id" });
        }
        const author = await Author.findOne({ _id: author_id });
        if (!author) {
            return res.error(400, { friendlyMsg: "author not found" });
        }
        if (!mongoose.isValidObjectId(author_id)) {
            return res.error(400, { friendlyMsg: "invalid expert id" });
        }
        const expert = await Author.findOne({ _id: expert_id });
        if (!expert) {
            return res.error(400, { friendlyMsg: "expert not found" });
        }
        const newTopic = await Topic({
            author_id,
            topic_title,
            topic_text,
            is_checked,
            is_approwed,
            expert_id,
        });
        await newTopic.save();
        res.ok(200, { friendlyMsg: "Topic added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editTopic = async (req, res) => {
    try {
        const { error, value } = topicValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const {
            author_id,
            topic_title,
            topic_text,
            is_checked,
            is_approwed,
            expert_id,
        } = value;
        if (!mongoose.isValidObjectId(author_id)) {
            return res.error(400, { friendlyMsg: "invalid author id" });
        }
        const author = await Author.findOne({ _id: author_id });
        if (!author) {
            return res.error(400, { friendlyMsg: "author not found" });
        }
        if (!mongoose.isValidObjectId(expert_id)) {
            return res.error(400, { friendlyMsg: "invalid expert id" });
        }
        const expert = await Author.findOne({ _id: expert_id });
        if (!expert) {
            return res.error(400, { friendlyMsg: "expert not found" });
        }
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const topic = await Topic.findOne({ _id: req.params.id });
        if (!topic) {
            return res.error(400, { friendlyMsg: "Topic not found" });
        }

        await Topic.updateOne(
            { _id: req.params.id },
            {
                author_id: author_id || topic.author_id,
                topic_title: topic_title || topic.topic_title,
                topic_text: topic_text || topic.topic_text,
                is_checked: is_checked || topic.is_checked,
                is_approwed: is_approwed || topic.is_approwed,
                expert_id: expert_id || topic.expert_id,
            }
        );
        res.ok(200, { friendlyMsg: "Topic updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteTopic = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const topic = await Topic.findOne({ _id: req.params.id });
        if (!topic) {
            return res.error(400, { friendlyMsg: "Topic not found" });
        }
        await Topic.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Topic deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getTopics,
    getTopic,
    addTopic,
    editTopic,
    deleteTopic,
};

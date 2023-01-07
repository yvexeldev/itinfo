const mongoose = require("mongoose");
const Media = require("../models/Media");
const Question_Answer = require("../models/Question_Answer");
const Description = require("../models/Description");
const Topic = require("../models/Topic");
const { mediaValidation } = require("../validations/media.validator");

const getMedias = async (req, res) => {
    try {
        const allMedias = await Media.find({});
        res.ok(200, allMedias);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getMedia = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const media = await Media.findOne({ _id: req.params.id });
        if (!media) {
            return res.error(400, { friendlyMsg: "media not found" });
        }
        res.ok(200, media);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addMedia = async (req, res) => {
    try {
        const { error, value } = mediaValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { media_name, media_file, target_table_name, target_table_id } =
            value;
        if (
            target_table_name != "Topic" &&
            target_table_name != "Description" &&
            target_table_name != "Question_Answer"
        ) {
            return res.error(400, { friendlyMsg: "invalid target table name" });
        }
        if (!mongoose.isValidObjectId(target_table_id)) {
            return res.error(400, { friendlyMsg: "invalid target table id" });
        }
        if (target_table_name == "Topic") {
            const topic = await Topic.findOne({ _id: target_table_id });
            if (!topic) {
                return res.error(400, { friendlyMsg: "topic not found" });
            }
        }
        if (target_table_name == "Description") {
            const description = await Description.findOne({
                _id: target_table_id,
            });
            if (!description) {
                return res.error(400, { friendlyMsg: "description not found" });
            }
        }
        if (target_table_name == "Question_Answer") {
            const question_answer = await Question_Answer.findOne({
                _id: target_table_id,
            });
            if (!question_answer) {
                return res.error(400, {
                    friendlyMsg: "question_answer not found",
                });
            }
        }
        const oldmedia = await Media.findOne({
            target_table_name: target_table_name,
            target_table_id: target_table_id,
        });
        if (oldmedia) {
            return res.error(400, { friendlyMsg: "media already exists" });
        }
        const newMedia = Media({
            media_name,
            media_file,
            target_table_name,
            target_table_id,
        });
        await newMedia.save();
        res.ok(200, { friendlyMsg: "media added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editMedia = async (req, res) => {
    try {
        const { error, value } = mediaValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { media_name, media_file, target_table_name, target_table_id } =
            value;
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const media = await Media.findOne({ _id: req.params.id });
        if (!media) {
            return res.error(400, { friendlyMsg: "media not found" });
        }
        if (
            target_table_name != "Topic" &&
            target_table_name != "Description" &&
            target_table_name != "Question_Answer"
        ) {
            return res.error(400, { friendlyMsg: "invalid target table name" });
        }

        if (!mongoose.isValidObjectId(target_table_id)) {
            return res.error(400, { friendlyMsg: "invalid target table id" });
        }
        if (target_table_name == "Topic") {
            const topic = await Topic.findOne({ _id: target_table_id });
            if (!topic) {
                return res.error(400, { friendlyMsg: "topic not found" });
            }

            if (target_table_name == "Description") {
                const description = await Description.findOne({
                    _id: target_table_id,
                });
                if (!description) {
                    return res.error(400, {
                        friendlyMsg: "Description not found",
                    });
                }
            }
            if (target_table_name == "Question_Answer") {
                const question_answer = await Question_Answer.findOne({
                    _id: target_table_id,
                });
                if (!question_answer) {
                    return res.error(400, {
                        friendlyMsg: "question_answer not found",
                    });
                }
            }
        }
        const media1 = await Media.findOne({
            target_table_name: target_table_name,
            target_table_id: target_table_id,
        });
        if (media1 && media1.id != req.params.id) {
            return res.error(400, { friendlyMsg: "media already exists" });
        }
        await Media.updateOne(
            { _id: req.params.id },
            {
                media_name,
                media_file,
                target_table_name,
                target_table_id,
            }
        );
        res.ok(200, { friendlyMsg: "Media updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteMedia = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const media = await Media.findOne({ _id: req.params.id });
        if (!media) {
            return res.error(400, { friendlyMsg: "media not found" });
        }
        await Media.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "media deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getMedias,
    getMedia,
    addMedia,
    editMedia,
    deleteMedia,
};

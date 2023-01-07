const Author = require("../models/Author");
const Question_Answer = require("../models/Question_Answer");
const mongoose = require("mongoose");
const {
    question_answerValidation,
} = require("../validations/question_answer.validator");

const getQuestion_Answers = async (req, res) => {
    try {
        const allQuestion_Answer = await Question_Answer.find({});
        res.ok(200, allQuestion_Answer);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getQuestion_Answer = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, {
                friendlyMsg: "invalid Question_Answer id",
            });
        }
        const question_Answer = await Question_Answer.findOne({
            _id: req.params.id,
        });
        if (!question_Answer) {
            return res.error(400, { friendlyMsg: "Question_Answer topilmadi" });
        }
        res.ok(200, question_Answer);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addQuestion_Answer = async (req, res) => {
    try {
        const { error, value } = question_answerValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { question, answer, is_checked, expert_id } = value;
        if (!mongoose.isValidObjectId(expert_id)) {
            return res.error(400, { friendlyMsg: "invalid expert id" });
        }
        const expert = await Author.findOne({ _id: expert_id });
        if (!expert) {
            return res.error(400, { friendlyMsg: "expert not found" });
        }
        const newQuestion_Answer = await Question_Answer({
            question,
            answer,
            is_checked,
            expert_id,
        });
        await newQuestion_Answer.save();
        res.ok(200, { friendlyMsg: "Question_Answer added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editQuestion_Answer = async (req, res) => {
    try {
        const { error, value } = question_answerValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { question, answer, is_checked, expert_id } = value;

        if (expert_id) {
            if (!mongoose.isValidObjectId(expert_id)) {
                return res.error(400, { friendlyMsg: "invalid expert id" });
            }
            const expert = await Author.findOne({ _id: expert_id });
            if (!expert) {
                return res.error(400, { friendlyMsg: "expert not found" });
            }
        }
        const question_Answer = await Question_Answer.findOne({
            _id: req.params.id,
        });
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        if (!question_Answer) {
            return res
                .status(404)
                .send({ friendlyMsg: "Question_Answer not found" });
        }
        await Question_Answer.updateOne(
            { _id: req.params.id },
            {
                question: question || question_Answer.question,
                answer: answer || question_Answer.answer,
                is_checked: is_checked || question_Answer.is_checked,
                expert_id: expert_id || question_Answer.expert_id,
            }
        );
        res.ok(200, { friendlyMsg: "Question_Answer updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteQuestion_Answer = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const question_Answer = await Question_Answer.findOne({
            _id: req.params.id,
        });
        if (!question_Answer) {
            return res.error(400, { friendlyMsg: "Question_Answer not found" });
        }
        await Question_Answer.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Question_Answer deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getQuestion_Answers,
    getQuestion_Answer,
    addQuestion_Answer,
    editQuestion_Answer,
    deleteQuestion_Answer,
};

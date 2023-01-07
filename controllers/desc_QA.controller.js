const Desc_QA = require("../models/Desc_QA");
const mongoose = require("mongoose");
const Description = require("../models/Description");
const Question_Answer = require("../models/Question_Answer");
const { desc_qaValidation } = require("../validations/desc_qa.validator");

const getDesc_QAs = async (req, res) => {
    try {
        const allDesc_QA = await Desc_QA.find({});
        res.ok(200, allDesc_QA);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getDesc_QA = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const desc_QA = await Desc_QA.findOne({ _id: req.params.id });
        if (!desc_QA) {
            return res.error(400, { friendlyMsg: "Desc_QA not found" });
        }
        res.ok(200, desc_QA);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addDesc_QA = async (req, res) => {
    try {
        const { error, value } = desc_qaValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { qa_id, desc_id } = value;

        if (!mongoose.isValidObjectId(qa_id)) {
            return res.error(400, { friendlyMsg: "invalid qa _ id" });
        }
        if (!mongoose.isValidObjectId(desc_id)) {
            return res.error(400, { friendlyMsg: "invalid desc _ id" });
        }
        const qa = await Question_Answer.findOne({ _id: qa_id });
        if (!qa) {
            return res.error(400, { friendlyMsg: "quest answ not found" });
        }
        const description = await Description.findOne({ _id: desc_id });
        if (!description) {
            return res.error(400, { friendlyMsg: "desc not found" });
        }
        const desc_qeusanw = await Desc_QA.findOne({
            qa_id: qa_id,
            desc_id: desc_id,
        });
        if (desc_qeusanw) {
            return res.error(400, { friendlyMsg: "desc_qa already exists" });
        }
        const newDesc_QA = await Desc_QA({
            qa_id,
            desc_id,
        });
        await newDesc_QA.save();
        res.ok(200, { friendlyMsg: "Desc_QA added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editDesc_QA = async (req, res) => {
    try {
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { qa_id, desc_id } = value;

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const desc_QA = await Desc_QA.findOne({ _id: req.params.id });
        if (!desc_QA) {
            return res.error(400, { friendlyMsg: "desc_QA not found" });
        }

        if (!mongoose.isValidObjectId(qa_id)) {
            return res.error(400, { friendlyMsg: "invalid qa _ id" });
        }
        if (!mongoose.isValidObjectId(desc_id)) {
            return res.error(400, { friendlyMsg: "invalid desc _ id" });
        }
        const qa = await Question_Answer.findOne({ _id: qa_id });
        if (!qa) {
            return res.error(400, { friendlyMsg: "quest answ not found" });
        }
        const description = await Description.findOne({ _id: desc_id });
        if (!description) {
            return res.error(400, { friendlyMsg: "desc not found" });
        }
        const desc_qeusanw = await Desc_QA.findOne({
            qa_id: qa_id,
            desc_id: desc_id,
        });
        if (desc_qeusanw) {
            return res.error(400, { friendlyMsg: "desc_qa already exists" });
        }
        await desc_QA.updateOne(
            { _id: req.params.id },
            {
                qa_id,
                desc_id,
            }
        );
        res.ok(200, { friendlyMsg: "desc_QA updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteDesc_QA = async (req, res) => {
    try {
        const desc_QA = await Desc_QA.findOne({ _id: req.params.id });
        if (!desc_QA) {
            return res.error(400, { friendlyMsg: "Desc_QA not found" });
        }
        await Desc_QA.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Desc_QA deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getDesc_QAs,
    getDesc_QA,
    addDesc_QA,
    editDesc_QA,
    deleteDesc_QA,
};

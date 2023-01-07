const Synonym = require("../models/Synonym");
const mongoose = require("mongoose");
const Description = require("../models/Description");
const Dictionary = require("../models/DIctionary");
const { synonymValidation } = require("../validations/synonym.validator");

const getSynonyms = async (req, res) => {
    try {
        const allSynonym = await Synonym.find({});
        res.ok(200, allSynonym);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getSynonym = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const synonym = await Synonym.findOne({ _id: req.params.id });
        if (!synonym) {
            return res.error(400, { friendlyMsg: "Synonym not found" });
        }
        res.ok(200, synonym);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addSynonym = async (req, res) => {
    try {
        const { error, value } = synonymValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const { desc_id, dict_id } = value;

        if (!mongoose.isValidObjectId(desc_id)) {
            return res.error(400, { friendlyMsg: "invalid desc id" });
        }
        const description = await Description.findOne({ _id: desc_id });
        if (!description) {
            return res.error(400, { friendlyMsg: "description not found" });
        }
        if (!mongoose.isValidObjectId(dict_id)) {
            return res.error(400, { friendlyMsg: "invalid Dictionary id" });
        }
        const dictionary = await Dictionary.findOne({ _id: dict_id });
        if (!dictionary) {
            return res.error(400, { friendlyMsg: "Dictionary not found" });
        }
        const synonym1 = await Synonym.findOne({
            desc_id: desc_id,
            dict_id: dict_id,
        });
        if (synonym1) {
            res.error(400, { friendlyMsg: "synonym already exists" });
        }
        const newSynonym = await Synonym({
            desc_id,
            dict_id,
        });
        await newSynonym.save();
        res.ok(200, { friendlyMsg: "Synonym added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editSynonym = async (req, res) => {
    try {
        const { error, value } = synonymValidation(req.body);
        if (error) {
            return res.error(400, { friendlyMsg: error.details[0].message });
        }
        const { desc_id, dict_id } = value;
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const synonym = await Synonym.findOne({ _id: req.params.id });
        if (!synonym) {
            return res.error(400, { friendlyMsg: "synonym not found" });
        }
        if (!mongoose.isValidObjectId(desc_id)) {
            return res.error(400, { friendlyMsg: "invalid desc _ id" });
        }
        if (!mongoose.isValidObjectId(dict_id)) {
            return res.error(400, { friendlyMsg: "invalid Dictionary _ id" });
        }
        const description = await Description.findOne({ _id: desc_id });
        if (!description) {
            return res.error(400, { friendlyMsg: "description not found" });
        }
        const dictionary = await Dictionary.findOne({ _id: dict_id });
        if (!dictionary) {
            return res.error(400, { friendlyMsg: "Dictionary not found" });
        }
        const synonym1 = await Synonym.findOne({
            desc_id: desc_id,
            dict_id: dict_id,
        });
        if (synonym1) {
            res.error(400, { friendlyMsg: "synonym already exists" });
        }
        console.log("aaa");
        await Synonym.updateOne(
            { _id: req.params.id },
            {
                desc_id,
                dict_id,
            }
        );
        res.ok(200, { friendlyMsg: "synonym updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteSynonym = async (req, res) => {
    try {
        const synonym = await Synonym.findOne({ _id: req.params.id });
        if (!synonym) {
            return res.error(400, { friendlyMsg: "Synonym not found" });
        }
        await Synonym.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Synonym deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getSynonyms,
    getSynonym,
    addSynonym,
    editSynonym,
    deleteSynonym,
};

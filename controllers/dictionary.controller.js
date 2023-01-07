const Dictionary = require("../models/DIctionary");
const mongoose = require("mongoose");
const { dictionaryValidation } = require("../validations/dictionary.validator");

const getDictionarys = async (req, res) => {
    try {
        const allDictionary = await Dictionary.find({});
        res.ok(200, allDictionary);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getDictionary = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const dictionary = await Dictionary.findOne({ _id: req.params.id });
        if (!dictionary) {
            return res.error(400, { friendlyMsg: "Dictionary topilmadi" });
        }
        res.ok(200, dictionary);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addDictionary = async (req, res) => {
    try {
        const { error, value } = dictionaryValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { term, letter } = value;
        const toLower = term.toLowerCase();
        // const letter = toLower[0];
        const dict = await Dictionary.findOne({ toLower: toLower });
        if (dict) {
            return res.error(400, { friendlyMsg: "termin already exists" });
        }
        const newDictionary = Dictionary({
            term,
            letter,
            toLower,
        });
        await newDictionary.save();
        res.ok(200, { friendlyMsg: "Dictionary qo'shildi" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editDictionary = async (req, res) => {
    try {
        const { error, value } = dictionaryValidation(req.body);
        if (error) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }

        const { term, letter } = value;
        // let { term } = req.body;
        const toLower = term.toLowerCase();
        // const letter = toLower[0];
        const dict = await Dictionary.findOne({ toLower: toLower });
        if (dict && dict.id != req.params.id) {
            return res.error(400, { friendlyMsg: "termin already exists" });
        }
        const dictionary = await Dictionary.findOne({ _id: req.params.id });
        if (!dictionary) {
            return res
                .status(404)
                .send({ friendlyMsg: "dictionary topilmadi" });
        }
        await Dictionary.updateOne(
            { _id: req.params.id },
            {
                term: term || dictionary.term,
                letter: letter || dictionary.letter,
                toLower: toLower || dictionary.toLower,
            }
        );
        res.ok(200, { friendlyMsg: "dictionary o'zgartirildi" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteDictionary = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid req id" });
        }
        const dictionary = await Dictionary.findOne({ _id: req.params.id });
        if (!dictionary) {
            return res.error(400, { friendlyMsg: "Dictionary topilmadi" });
        }
        await Dictionary.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "Dictionary o'chirildi" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getDictionarys,
    getDictionary,
    addDictionary,
    editDictionary,
    deleteDictionary,
};

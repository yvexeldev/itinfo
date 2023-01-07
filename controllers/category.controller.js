const mongoose = require("mongoose");
const Category = require("../models/Category");
const { categoryValidation } = require("../validations/category.validator");

const getCategorys = async (req, res) => {
    try {
        const allCategory = await Category.find({});
        res.ok(200, allCategory);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const getCategory = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const category = await Category.findOne({ _id: req.params.id });
        if (!category) {
            return res.error(400, { friendlyMsg: "Category not found" });
        }
        res.ok(200, category);
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { err } = categoryValidation(req.body);
        if (err) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        const { category_name } = req.body;
        const parent_category_id = req.body.parent_category_id;
        const newCategory = await Category({
            category_name,
            parent_category_id,
        });
        if (parent_category_id) {
            if (!mongoose.isValidObjectId(parent_category_id)) {
                return res.error(400, { friendlyMsg: "invalid id" });
            }
            const parent = await Category.findOne({ _id: parent_category_id });
            if (!parent) {
                return res.error(400, { friendlyMsg: "parent not found" });
            }
            await newCategory.save();
            return res.ok(200, { friendlyMsg: "category added" });
        }
        await newCategory.save();
        res.ok(200, { friendlyMsg: "category added" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const editCategory = async (req, res) => {
    try {
        const { err } = categoryValidation(req.body);
        if (err) {
            return res.error(400, {
                friendlyMsg: error.details[0].friendlyMsg,
            });
        }
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.error(400, { friendlyMsg: "invalid id" });
        }
        const category = await Category.findOne({ _id: req.params.id });
        if (!category) {
            return res.error(400, { friendlyMsg: "category not found" });
        }
        const { category_name, parent_category_id } = req.body;

        if (parent_category_id) {
            if (!mongoose.isValidObjectId(parent_category_id))
                return res.error(400, { friendlyMsg: "invalid parent id" });
            const parent = await Category.findOne({ _id: parent_category_id });
            if (!parent) {
                return res.error(400, { friendlyMsg: "parent not found" });
            }
        }
        const cate = await Category.findOne({
            category_name: { $regex: category_name, $options: "i" },
        });
        if (cate.id != category.id)
            return res.error(400, { friendlyMsg: "category already exists" });
        await Category.updateOne(
            { _id: req.params.id },
            {
                category_name: category_name || category.category_name,
                parent_category_id:
                    parent_category_id || category.parent_category_id,
            }
        );
        res.ok(200, { friendlyMsg: "category updated" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        if (!category) {
            return res.error(400, { friendlyMsg: "category not found" });
        }
        await Category.deleteOne({ _id: req.params.id });
        res.ok(200, { friendlyMsg: "category deleted" });
    } catch (error) {
        res.error(400, { friendlyMsg: error.message });
    }
};

module.exports = {
    getCategorys,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory,
};

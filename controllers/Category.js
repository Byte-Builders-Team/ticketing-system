const Category = require('../models/categories-model');

// Get a list of categories (For Admin)
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching categories' });
      }

};

// Update a category by ID (For Admin)
const updateCategory = async (req, res) => {
          //todo

};

// Delete a category by ID (For Admin)
const deleteCategory = async (req, res) => {
         //todo

};

module.exports = {
  getCategories,
  updateCategory,
  deleteCategory,
};

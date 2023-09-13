const Category = require('../models/categories-model');
const validator = require('../utils/validator.js')

const createCategory = async(req, res) =>{

    const body = req.body
    if (!validator.isBodyValid(body, ["name", "create_by"])) {
        return res.status(400).json({ success: false, error: 'You must provide a Category Info!' })
    }

    const category = new Category(body);

    if (!category) {

        return res.status(400).json({ success: false, error: 'Category does not created!' })
    }

    category.save().then(() => {
        return res.status(201).json({
            success: true,
            id: category._id,
            message: 'Category created!',
        })

    }).catch((err) => {
        return res.status(400).json({ success: false, error: 'Category does not created! ' + err })
    })

    
}

const updateCategory = async (req, res) => {

    const categoryId = req.params.id;
    const body = req.body;


    if (!validator.isBodyValid(body, ["name", "create_by"])) {

        return res.status(400).json({ error: "no the body" });
    }


    const updatedCategory = await Category.findByIdAndUpdate(categoryId, body);

    if (!updatedCategory) {

        return res.status(404).json({ error: 'Category not found' });
    }


    updatedCategory.save().then(() => {
        return res.status(201).json({
            success: true,
            updatedCategory,
            message: 'Category Updated!',
        });

    }).catch(err => {
        return res.status(400).json({ err, message: 'Category does not Updated!' })
    });

}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching categories' });
    }

};

const getCategorieById = async (req, res) => {
   
    try {
        
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(400).json({ success: false, error: 'Category does not exist!', })
        } else {
            return res.status(201).json({ category })
        }

    } catch (error) {
        res.status(500).json({ error: 'Cant get Category , ' + error });
    }

};

const deleteCategory = async  (req , res )=>{
    try{
        const deletedCateory = await Category.findByIdAndDelete(req.params.id);
        
        if (!deletedCateory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports = { updateCategory, getCategories, deleteCategory, createCategory, getCategorieById }

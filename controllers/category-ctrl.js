const Category = require('../models/Category');
const validator = require('../utils/validator.js')


const updatecategory = async (req, res) => {

    const categoryId = req.params.id;
    const body = req.body;


    if (!validator.isBodyValid(body)) {

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

module.exports = { updatecategory }

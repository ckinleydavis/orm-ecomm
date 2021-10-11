const router = require("express").Router();
const { Category, Product } = require('../../models');

// Get All Existing Categories and its Products
router.get("/", async (req, res) => {
    try{
        const categoryData = await Category.findAll({
            include: {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            },
        });

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// Create New Category
router.post("/", async (req, res) => {
    try {

    } catch (err) {

    }
});

// Find Category and its Products by ID

// Update Category

// Delete Category

module.exports = router;
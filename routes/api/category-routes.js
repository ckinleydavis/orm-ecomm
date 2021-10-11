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
        res.status(500).json(err);
    }
});

// Create New Category
router.post("/", async (req, res) => {
    try {
        const categoryData = await Category.create({
            category_name: req.body.category_name
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Find Category and its Products by ID
router.get("/:id", async (req, res) => {
    try {
        const categoryData = await Category.findOne ({
            where: { id: req.params.id },
            include: {
                model: Product,
                attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id' ]
            }
        })
    res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Category
router.get("/:id", async (req, res) => {
    try {
        const categoryData = await Category.update(
            { category_name: req.body.category_name },
            { where: { id: req.params.id } },
        );  
    res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Category
router.delete("/:id", async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: { id: req.params.id }
        });
        
        if (!categoryData) {
            res.status(404).json({ message: "Category could not be found!" });
            return;
        }
    res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
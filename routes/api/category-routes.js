const router = require("express").Router();
const { Category, Product } = require('../../models');

router.get("/", async (req, res) => {
    // Get All Categories with their Products
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
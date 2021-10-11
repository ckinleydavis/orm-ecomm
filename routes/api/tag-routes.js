const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get All Tags 
router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
    });
    res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a Tag
router.post('/', async (req, res) => { 
    try {
        const tagData = await Tag.create({
            tag_name: req.body.tag_name
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get Tag by ID
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findOne({
            where: { id: req.params.id },
            include: {
                model:Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    });
    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Update a Tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id }}
    );  
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Tag
router.delete('/:id', async (req, res) => {
    try {
        const tagData = await Tag.destroy({
            where: { id: req.params.id }
        });

        if (!tagData) {
        res.status(404).json({ message: 'Tag not found!' });
        return;
        }
        
    res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
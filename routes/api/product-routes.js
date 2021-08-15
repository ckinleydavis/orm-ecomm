const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products
router.get('/', async( req, res ) => {
    try {
        const productNames = await Product.findAll({
            attributes: ['id', 'product_name', 'price', 'stock', 'category_name', 'tag_name']
        });
        return res.json(productNames);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one product
router.get('/:id', async( req, res ) => {
    try {
        const productData = await Product.findByPk(req.params.id, {
            attributes: ['product_name', 'category_name', 'tag_name']
        });
        return res.json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new product
router.post('/', ( req, res ) => {
    Product.create(req.body)
        .then((product) => {
            /* if there's product tags, we need to create pairings to 
            bulk create in the ProductTag model */
            if(req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id, tag_id
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // If no product tags, just respond
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        });
});

// Update product
router.put('/:id', ( req, res ) => {
    // Update product data
    Product.update( req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((product) => {
        // Find all associated tags from ProductTag
        return ProductTag.findAll({
            where: {
                product_id: req.params.id
            }
        });
    })
    .then((productTags) => {
        // Get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id );
        // Create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
                return {
                    product_id: req.params.id, tag_id
                };
            });
        // Figure out which ones to remove
        const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
        // Run both actions
        return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags)
        ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err); 
    });
});

router.delete('/:id', (req, res) => {
    // Delete one product by its `id` value
});

module.exports = router;
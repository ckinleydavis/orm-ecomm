// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

// Products belongToMany Tags (thru ProductTag)
Product.belongsToMany(Tag, {
    through: 'ProductTag',
    foreignKey: 'product_id'
});

// Tags belongToMany Products (thru ProductTag)
Tag.belongsToMany(Product, {
    through: 'ProductTag',
    foreignKey: 'tag_id'
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag
};
// Import sequelize library and db conn from config.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/* Initialize Product model (table) by extending
   off Sequelize's Model class */
class Product extends Model{};

// Set up fields and rules for Product model
Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'customer',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product'
    }
);

module.exports = Product;
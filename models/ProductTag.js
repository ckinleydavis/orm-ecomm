// Import sequelize library and db conn from config.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/* Initialize ProductTag model (table) by extending
   off Sequelize's Model class */
class ProductTag extends Model{};

// Set up fields and rules for ProductTag model
ProductTag.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'product',
            key: 'id'
        }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'tag',
            key: 'id'
        }
    }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'product_tag',
});

module.exports = ProductTag;
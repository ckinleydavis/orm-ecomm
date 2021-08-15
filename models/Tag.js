// Import sequelize library and db conn from config.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/* Initialize ProductTag model (table) by extending
   off Sequelize's Model class */
class Tag extends Model{};

// Set up fields and rules for Category model
Tag.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tag_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
});

module.exports = Tag;
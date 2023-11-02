const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Temperament', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {timestamps: false})
};
    
///////////////////////////////////////////////////////////////////////////////////////////////////

// const { DataTypes, Sequelize } = require('sequelize');
// const {conn} = require('../db');

// const Temperament = conn.define('temperament', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: Sequelize.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },

//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
// }, {
//     timestamps: false
// })

// module.exports = { Temperament }
// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('dog', {
//     id:{
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true
//     },
//     name:{
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     height_min:{
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     weight_min:{
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     height_max:{
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     weight_max:{
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     life_span:{
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     image:{
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     createdInDB: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true
//     }
//   });
// };


const { DataTypes, Sequelize } = require('sequelize');
const {conn} = require('../db')

const Dog = conn.define('dog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3,20]
    }
  },

  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    }
  },
  origen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alturamin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 15,
      max: 100,
    }
  },

  alturamax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 15,
      max: 100,
    }
  },
  pesomin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 5,
      max: 80,
    }
  },
  pesomax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 5,
      max: 80,
    }
  },
  vidamin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 2,
      max: 35,
    }
  },
  vidamax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 2,
      max: 35,
    }
  }
})

module.exports = { Dog }
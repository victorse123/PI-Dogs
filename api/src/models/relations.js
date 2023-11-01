const { Dog } = require('./Dog')
const { Temperament } = require('./Temperament')

Temperament.belongsToMany(Dog, {
    through: "dogTemperament",
    timestamps: false
})

Dog.belongsToMany(Temperament, {
    through: "dogTemperament",
    timestamps: false
})

module.exports = { Dog, Temperament }
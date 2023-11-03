const { Dog } = require('../db')

const findDBid = async  (id, dogDetalle) => {
    
    try {
        const [ newDog, create ] = await Dog.findOrCreate({
            where: { id },
            defaults: {
                image:dogDetalle.image,
                name:dogDetalle.name, 
                height_min:dogDetalle.height_min, 
                height_max:dogDetalle.height_max,
                weight_min:dogDetalle.weight_min,
                weight_max:dogDetalle.weight_max,
                life_span_max:dogDetalle.life_span_max,
                temperament:dogDetalle.temperament,
            }
        })
    if(create){ return newDog.toJSON()}
        
    } catch (error) {
        throw new Error(`No es posible agregar... ${error}`)
    }
}

module.exports = findDBid;
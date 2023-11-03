const { Dog, Temperaments } = require('../db')

const postDogs = async (req, res) => {
    const { image, 
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span_min,
            life_span_max,
            temperament
         } = req.body
    try {
        if(image&&name&&height_max&&height_min&&weight_max&&weight_min&&life_span_max&&life_span_min&&temperament){
            const [ dog , creado ] = await Dog.findOrCreate({
                
                where: { image, 
                    name,
                    height_min,
                    height_max,
                    weight_min,
                    weight_max,
                    life_span_min,
                    life_span_max,
                    temperament }
            
            });
            if(creado){
                

                return res.status(200).json('Se agrego con exito a '+dog.name);}
        }else{
            res.status(404).json({message:'Faltan datos'})
        }
        
    } catch (error) {
        res.status(500).json({message:error})
    }
}

module.exports = postDogs;
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const findDBid = require('../handlers/findDbid')

const getIdRaza = async (req, res) => {
    
    try {
    
        const { idRaza } = req.params;
       
        const response = await axios.get(`${URL}`)

        

        if(response.data){
            
            const apiDog = response.data.find((dog) => dog.id === +idRaza);
            
            if(apiDog){

            const { id, image, name, height, weight, life_span, temperament } = apiDog
                
            if(id && image && name && height && weight && life_span && temperament){
                    
                    let heightMinMax = height.metric.split('-');
                    
                    let weightMinMax = weight.metric.split('-');
                    
                    let life_spanArray = life_span.split('-');
                    
                    let life_spanMax = life_spanArray[1].split(' ');
                    
                 
                    
                    const dogDetalle = {
                        id : id,
                        image: image.url,
                        name: name,
                        height_min: parseInt(heightMinMax[0], 10),
                        height_max: parseInt(heightMinMax[1], 10),
                        weight_min: parseInt(weightMinMax[0], 10),
                        weight_max: parseInt(weightMinMax[1], 10),
                        life_span_min: parseInt(life_spanArray[0], 10),
                        life_span_max: parseInt(life_spanMax[1], 10),
                        temperament: temperament,
                    }
                    const newDog = await findDBid(idRaza, dogDetalle)
                    res.status(200).json(newDog)
                } else {
                    res.status(404).json({message: 'Faltan datos'})
                }
            }
        }
    } catch (error) {
    res.status(500).json({message:error})    
    }	
}

module.exports = getIdRaza;
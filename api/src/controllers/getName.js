const axios = require('axios');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const { Dog } = require('../db')



const getName = async (req, res) => {
    try {
        
        const { name } = req.query;
        

        if(name){

            const response = await axios.get(`${URL}`)
            if(response.data){
                const apiList = response.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
                const dbList = await Dog.findAll({

                    where:{
                        name:{
                            [Sequelize.Op.iLike]: `%${name}%`

                        }
                    }
                })
                
                if (apiList.length > 0) {
                    const allDogs = [...apiList, ...dbList]
                    res.status(200).json(allDogs)
                }
            }
            } else {
                res.status(404).json({ message: 'No se encuentra esta raza' })
            }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


module.exports = getName
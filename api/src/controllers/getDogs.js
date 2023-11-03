require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


const getDogs = async (req, res) => {

    const response = await axios.get(`${URL}`)
    
    try {
        if(response.data){
            res.status(200).json(response.data)
        }
        
    } catch (error) {
        res.status(404).json({message:error})
    }

}

module.exports = getDogs;
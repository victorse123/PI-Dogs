const { Router} = require('express');

const axios = require('axios');
const {API, API_SEARCH, API_KEY} = process.env;
const {Dog, Temperament} = require("../db")
const { Op } = require('sequelize');
const {formateoDb, formateoApi} = require("../controllers/controllers");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async(req, res, next) => {
    try {
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data
    const dogDb = await Dog.findAll({include: Temperament});

    const validandoDogsDb = await formateoDb(dogDb)
    const validandoDogsApi = await formateoApi(dogApi)

    const allDog = await validandoDogsApi.concat(validandoDogsDb)
    
    res.json(allDog)

    } catch (error) {next(error)}
})

router.get('/dogs/:idRaza', async(req, res, next) => {
    const {idRaza} = req.params;
        if(!idRaza) {
        return res.status(400).send({msg: "Falta enviar datos obligatorios"})
        }

    try {
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data
    const dogDb = await Dog.findAll({include: Temperament});

    const validandoDogsDb = await formateoDb(dogDb)
    const validandoDogsApi = await formateoApi(dogApi)

    const allDog = await validandoDogsDb.concat(validandoDogsApi)

    const dog = allDog.filter(d => d.id == idRaza)

    return res.status(200).send(dog)
    } catch (error) {next(error)}
})

router.get('/search', async(req, res, next) => {
    const {name} = req.query;
    try {

    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data
    const dogDb = await Dog.findAll({where: {name: {[Op.iLike]:`${name}%`}}, include: Temperament})

    const validandoDogsDb = await formateoDb(dogDb)
    const validandoDogsApi = await formateoApi(dogApi)

    const allDog = await validandoDogsApi.concat(validandoDogsDb)
        if(!name){
        res.send(allDog)
        } else {
        const dog = await allDog.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
        return res.status(200).send(dog)
        }

    } catch (error) {next(error)}
})

router.post('/dogs', async(req, res) => {
    const {name, height_min, height_max, weight_min, weight_max, temperament} = req.body;
    
    // Define valores válidos para height_min, weight_min, height_max y weight_max
    const validHeightMin = 20;
    const validWeightMin = 10;
    const validHeightMax = 30;
    const validWeightMax = 15;

    if (!name) {
        return res.status(400).send({ msg: "Falta enviar datos obligatorios" });
    }

    try {
        // Crea el nuevo perro con valores válidos
        const dog = await Dog.create({
            name,
            height_min: validHeightMin,
            height_max: validHeightMax,
            weight_min: validWeightMin,
            weight_max: validWeightMax,
        });

        let tempDb = await Temperament.findAll({ where: { id: temperament } });

        await dog.addTemperament(temperament);

        return res.status(201).send({ msg: "Perro creado correctamente" });

    } catch (error) {
        console.log(error);
    }
})

// router.post('/dogs', async(req, res) => {
//     const {name, height_min, height_max, weight_min, weight_max, temperament} = req.body;
//         if(!name || !height_min || !height_max || !weight_min || !weight_max) {
//         return res.status(400).send({msg: "Falta enviar datos obligatorios"})
//         }   
//     try {
//     const dog = await Dog.create(req.body)

//     let tempDb = await Temperament.findAll({where: {id : temperament}})

//     await dog.addTemperament(temperament)

//     return res.status(201).send({msg: "Perro creado correctamente"})

//     } catch (error) {console.log(error)}
// })

router.get('/temperaments', async(req, res, next)=> {
    try {
    const temperamentos = (await axios.get(`${API}?api_key=${API_KEY}`)).data
    const formateo = temperamentos.map(t => t.temperament)
    const uniendo = formateo.filter(r => r != null).join().split(", ").join().split(",")

    let resultado = uniendo.reduce((a, e) => {
        if(!a.find(d => d == e)) a.push(e)
        return a
    }, []);

    resultado = resultado.map(t => {return{name: t}})

    const allTemps = await Temperament.findAll()
    
        if(allTemps.length === 0) { await Temperament.bulkCreate(resultado)} 
        const temper = await Temperament.findAll()
      
        res.send(temper)

    } catch (error) {next(error)}
})

module.exports = router;
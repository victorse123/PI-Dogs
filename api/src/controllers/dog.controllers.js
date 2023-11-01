// module.exports = {
//     formateoDb : async function(dogDb) {
  
//         const dbFormateo = dogDb.map(dog => {
//         return {
//           id: dog.id,
//           image: dog.image,
//           name: dog.name,
//           weight_min: dog.weight_min,
//           weight_max: dog.weight_max,
//           height_min: dog.height_min,
//           height_max: dog.height_max,
//           life_span_min: dog.life_span_min,
//           life_span_max: dog.life_span_max,
//           temperament: dog.temperaments,
//           creadoEnDB: dog.creadoEnDB
//         }
//       })
  
//         const validandoDogsDb = dbFormateo.map(d => {
//             if(!d.image) {
//             d.image = "https://www.santevet.es/uploads/images/es_ES/articulos/razasperro.jpeg"
//             }
//             if(Array.isArray(d.temperament)) {
//             d.temperament = d.temperament.map(t => t.name)
//             d.temperament = d.temperament.join(", ")
//             }
//             return d
//         })
//         return validandoDogsDb
//     },
  
//     formateoApi : async function(dogApi) {
  
//         const apiFormateo = dogApi.map(dog => {
//         return {
//             id: dog.id,
//             image: dog.image.url,
//             name: dog.name,
//             weight_min: dog.weight.metric.slice(0, 2).trim(),
//             weight_max: dog.weight.metric.slice(-2).trim(),
//             height_min: dog.height.metric.slice(0, 2).trim(),
//             height_max: dog.height.metric.slice(4).trim(),
//             life_span_min: dog.life_span.slice(0, 2).trim(),
//             life_span_max: dog.life_span.slice(4, -6).trim(),
//             // life_span_max: parseInt(dog.life_span.slice(4).trim()),
//             temperament: dog.temperament
//         }
//         })
  
//         const validandoDogsApi = await apiFormateo.map(d => {
//             if(!d.weight_min || d.weight_min === "Na" || d.weight_min === "NaN" || d.weight_min === "aN") {
//                 if(!d.weight_max || d.weight_max === "Na" || d.weight_max === "NaN" || d.weight_max === "aN") {
//                 d.weight_min = "8"
//                 } else {
//                 d.weight_min = (d.weight_max - 2).toString();
//                 }
//                 }
        
//             if(!d.weight_max || d.weight_max === "Na" || d.weight_max === "NaN" || d.weight_max === "aN") {
//                 if(!d.weight_min || d.weight_min === "Na" || d.weight_min === "NaN" || d.weight_min === "aN") {
//                 d.weight_max = "12"
//                 } else {
//                 d.weight_max = (parseInt(d.weight_min) + 7).toString();
//                 }
//                 }
  
//             if(!d.height_max) {
//                 if(!d.height_min) {
//                 d.height_max = "42"
//                 } else {
//                 d.height_max = (parseInt(d.height_min) + 3).toString();
//                 }
//             }
  
//             if(!d.life_span_max) {
//                 if(!d.life_span_min) {
//                 d.life_span_max = "19"
//                 } else {
//                 d.life_span_max = (parseInt(d.life_span_min) + 2).toString();
//                 }
//             }
  
//             if(!d.temperament) {
//             d.temperament = "Happy, Active, Dutiful, Confident, Stubborn"
//             }
//             return d
//         })
//         return validandoDogsApi 
//     }
// }



const { Dog, Temperament } = require('../models/relations')
const {fn, where, col, Op} = require("sequelize")

const findDogs = async ({name}) => {
    try {
    const resp = await fetch(process.env.URI_API)
    const data = await resp.json()

    const arrApi = data.map(dog => {
        let vida = dog.life_span?.split(' ')
        let alturamin = Number(dog.height.metric.split(" - ")[0]) 
        let alturamax = Number(dog.height.metric.split(" - ")[1]) 
        let pesomin = Number(dog.weight.metric.split(" - ")[0]) 
        let pesomax = Number(dog.weight.metric.split(" - ")[1]) 
        let vidamin = Number(vida[0])
        let vidamax = Number(vida[2]) 
        let temperaments = dog.temperament?.split(',').map(t => t.trim())

        return {
            id: dog.id,
            nombre: dog.name,
            imagen: dog.image.url,
            origen: "externo",
            alturamin, alturamax, pesomin, pesomax, vidamin, vidamax, temperaments
        }
    })
        //SI NO VIENE UN NAME EN REQ QUERY ENTREGO TODOS LOS DOGS
    if(!name) {
        const doge = await Dog.findAll({
            include: {model: Temperament}
        })
        return [...doge, ...arrApi]
    }

        // SI VIENE NAME, AGREGO WHERE AL FINDALL, AMBOS CASOS INCLUYO EL MODELO DE TEMPERAMENTOS
    const minusc = name.toLowerCase()
    const doge = await Dog.findAll({
        where: {
            // nombre: where(fn("LOWER", col('nombre')), "LIKE", `%${minusc}%`)
            nombre: {
                [Op.iLike]: `%${minusc}%`
            }
        },
        include: { 
            model: Temperament
            },
        })
    if(!doge) throw `No se encuentra ${name}`
    return doge

    } catch (error) {
        throw error
    }
}

const findDogById = async (id) => {
    try {        
        //BUSCAR EN DATA API
        const resp = await fetch(process.env.URI_API)
        const data = await resp.json()
        if(!isNaN(Number(id))){
            const findApi = data.find(dog => dog.id === Number(id))
            let vida = findApi?.life_span?.split(' ')
            let alturamin = Number(findApi?.height?.metric.split(" - ")[0]) 
            let alturamax = Number(findApi?.height?.metric.split(" - ")[1]) 
            let pesomin = Number(findApi?.weight?.metric.split(" - ")[0]) 
            let pesomax = Number(findApi?.weight?.metric.split(" - ")[1]) 
            let vidamin = Number(vida[0])
            let vidamax = Number(vida[2])
            let temperaments = findApi.temperament?.split(',').map(t => t.trim())
            const formatted = {
                id: findApi.id,
                nombre: findApi.name,
                imagen: findApi.image.url,
                origen: "externo",
                alturamin, alturamax, pesomin, pesomax, vidamin, vidamax, temperaments
            }
            if(findApi) return formatted
        }

        //BUSCAR EN BD
        const doge = await Dog.findByPk(id, {
            include: { 
                model: Temperament
                },
        })
        return doge
    } catch (error) {
        console.log(error)
        throw `Raza con id: ${id} no es encontrada`
    }
}

const newBreedDog = async ({nombre, imagen, alturamin, alturamax, pesomin, pesomax, vidamin, vidamax, arrTemperamentosId}) => {
    try {
        if(!nombre || !imagen || !alturamin || !alturamax || !pesomin || !pesomax || !vidamin || !vidamax) throw 'Faltan datos'
        const doge = await Dog.create({
            origen: "database",
            nombre, 
            imagen, 
            alturamin, 
            alturamax, 
            pesomin, 
            pesomax, 
            vidamin, 
            vidamax, 
            arrTemperamentosId
        })
        if(arrTemperamentosId && arrTemperamentosId.length > 0) {
            const addDogTemperament = await doge.addTemperament(arrTemperamentosId)
            console.log(addDogTemperament)
            if(addDogTemperament.length === 0) throw 'No es viable'
        }
        return doge
    } catch (error) {
        throw error
    }
}

const updateDataDog = async ({id}, {nombre, imagen, alturamin, alturamax, pesomin, pesomax, vidamin, vidamax, arrTemperamentosId}) => {
    try{
        console.log(id)
        const findUsr = await Dog.findByPk(id)
        if(!findUsr) throw 'Dog no es hallado'
        findUsr.nombre = nombre
        return findUsr.save()
    } catch (error) {
        throw error
    }
}

const removeDog = async ({id}) => {
    try {
        const borrarDog = await Dog.destroy({where: {id}})
        return borrarDog
    } catch (error) {
        throw error
    }
}
module.exports = {findDogs, findDogById, newBreedDog, updateDataDog, removeDog}
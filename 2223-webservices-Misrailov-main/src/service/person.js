const { PrismaClient, } = require('@prisma/client');

const prisma = new PrismaClient(); 
const ServiceError = require('../core/serviceError');
const {getLogger} = require('../core/logging');
const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
  };

const getAll = async() =>{
    debugLog('Fetching all persons');
    const personsData = await prisma.person.findMany();
    
    return personsData
    
}

const getById = async(id) =>{
    debugLog(`Fetching person with id ${id}`)
    const foundPerson = await prisma.person.findUnique({
        where:{
            id: parseInt(id),
        },
    })
    if(!foundPerson){
    throw ServiceError.notFound(`No person with id ${id} exists`,{id});
    }
    const foundBookCollections = await prisma.bookCollection.findMany({
        where:{
            personId:parseInt(id)
            }
    })
    return {foundPerson,foundBookCollections}
}

const getBookCFromPersonId = async(id) =>{
    debugLog(`Fetching book collection from person  with id ${id}`)
    const foundBookC = await prisma.bookCollection.findUnique({
    where:{
        personId:parseInt(id)
    },
    
    })
    if(!foundBookC){
        throw ServiceError.notFound(`No book collection with personId ${id} exists`,{id
        })
    }
    return foundBookC
}
const getByAuth0Id = async(auth0Id) =>{
    debugLog(`Fetching user with auth0id ${auth0Id}`);
    const user = await prisma.person.findUnique({
        where:{
            auth0Id:auth0Id
        }
    })
    if(!user){
        throw ServiceError.notFound(`No user with id ${auth0Id} exists`,{
            auth0Id
        });
    }
    return user;
}



const updateById = async(idFromPar,{firstName,lastName,email,auth0Id}) =>{
    debugLog(`Updating person with id ${idFromPar}`)
    const updateUser = await prisma.person.update({
        where:{
            id: parseInt(idFromPar), 
        },
        data:{
            firstName:firstName,
            lastName:lastName,
            email:email,
            auth0Id:auth0Id,
        },
    })
    if(!updateUser){
        throw ServiceError.notFound(`No person with id ${idFromPar} exists`,{idFromPar});
    }
    return updateUser;
    
}

const deleteById = async(id) =>{
    debugLog(`Deleting person with id ${id}`)
    const deleteUser = await prisma.person.delete({
        where:{
            id: parseInt(id),
        }
    })
    if(!deleteUser){
        throw ServiceError.notFound(`No person with id ${id} exists`,{id});
    }
    return deleteUser;

}
const create = async({firstName,lastName,email,auth0Id}) =>{
    debugLog(`Creating person with firstName ${firstName}, lastName ${lastName}, email ${email}, auth0Id ${auth0Id}`)
const newPerson = await prisma.person.create({
    data:{
        firstName:firstName,
        lastName:lastName,
        email:email,
        auth0Id:auth0Id,
    }
})
 await prisma.bookCollection.create({
    data:{
        personId:newPerson.id,
        title:"Favourites",
        
        description:`Favourite books of ${newPerson.firstName}`,
        imgLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Emoji_u2665.svg/1024px-Emoji_u2665.svg.png"
    }
});
await prisma.bookCollection.create({
    data:{
        personId:newPerson.id,
        title:"Read Books",
        
        description:`Books read by ${newPerson.firstName}`,
        imgLink:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqsmU-oNSBslnp1WXHDInn-YEU1ne9Bz_jQA&usqp=CAU"    }
});
return newPerson;
}



module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getBookCFromPersonId,
    getByAuth0Id
}
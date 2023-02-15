const { PrismaClient } = require("@prisma/client");

const {getLogger} = require('../core/logging');
const ServiceError = require('../core/serviceError');



const prisma = new PrismaClient();
const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
  };



const getAll = async() =>{
    debugLog('Fetching all book collections');
    const bookCData = await prisma.bookCollection.findMany();
    return bookCData;
}

const getById = async(id) =>{
    debugLog(`Fetching book collection with id ${id}`)
    const foundBookC = await prisma.bookCollection.findUnique({
        where:{
            id: parseInt(id),
        }
    })
    if(!foundBookC){
        throw ServiceError.notFound(`No book collection with id ${id} exists`,{id});
    }
    const foundBookCollectionLinktable = await prisma.bookCollectionLinktable.findMany({
    where:{
        bookCollectionId:parseInt(id)
    }
    })
return {foundBookC,foundBookCollectionLinktable}
}

const updateById = async(bookCollection_id,{title}) =>{
    debugLog(`Updating book collection with id ${bookCollection_id} with title ${title}`)
    const updateBookC = await prisma.bookCollection.update({
        where:{
            id: parseInt(bookCollection_id),
        },
        data:{
            title:title,
        }
    })
    return updateBookC;
}

const deleteById = async(id) =>{
    debugLog(`Deleting book collection with id ${id}`)
    const deleteBookC = await prisma.bookCollection.delete({
        where:{
            id: parseInt(id),
        }
    });
    return  deleteBookC;

}

const create = async({title,personId,description,imgLink}) =>{
    const newBookC = await prisma.bookCollection.create({
        data:{
            title:title,
            personId:personId,
            description:description,
            imgLink:imgLink,
}   
})
return newBookC;
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}
const { PrismaClient } = require('@prisma/client');

const {getLogger} = require('../core/logging');
const ServiceError = require('../core/serviceError');


const prisma = new PrismaClient(); 
const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
  };


const getAll = async() =>{
    debugLog('Fetching all book collection linktables');
    const bookCLData = await prisma.bookCollectionLinktable.findMany();
    return bookCLData
    
}
const getById = async(id) =>{
    debugLog(`Fetching book collection linktable with id ${id}`)
    const foundBookCL = await prisma.bookCollectionLinktable.findUnique({
        where:{
            id: parseInt(id),
        },
    })
    if(!foundBookCL){
    throw ServiceError.notFound(`No book collection linktable with id ${id} exists`,{id});
    }
    return foundBookCL
    
}
const updateById = async(id,{progress,review,isFavorite,isRead}) =>{
    debugLog(`Updating book collection linktable with id ${id} with progress ${progress}, review ${review}, isFavorite ${isFavorite}, isRead ${isRead}}`)
    const updateBookCL = await prisma.bookCollectionLinktable.update({
    where:{
        id: parseInt(id),
    },
    data:{
        progress:progress,
        review:review,
        isFavorite:isFavorite,
        isRead:isRead

    }
    
    });
    return updateBookCL;
}
const deleteById = async(id) =>{
    debugLog(`Deleting book collection linktable with id ${id}`)
    const deleteBookCL = await prisma.bookCollectionLinktable.delete({
        where:{
            id: parseInt(id),
        }
    })
    
    return deleteBookCL;
}

const create = async({bookCollectionId,bookId,progress,review,isFavorite,isRead,title,subtitle,imgLink,authors}) =>{
    debugLog(`Creating book collection linktable with bookCollectionId ${bookCollectionId}, bookId ${bookId}, progress ${progress}, review ${review}, isFavorite ${isFavorite}, isRead ${isRead}, title ${title}, subtitle ${subtitle}, imgLink ${imgLink}, authors ${authors}`)
    const newBookCL = await prisma.bookCollectionLinktable.create({
data:{  review: review,
        bookCollectionId:bookCollectionId,
        bookId:bookId,
        progress:progress,
        isFavorite:isFavorite,
        isRead:isRead,
        title:title,
        subtitle:subtitle,
        imgLink:imgLink,
        authors:authors

    }
    
    })
    
    return newBookCL;
}



module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}
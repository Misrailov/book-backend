const Joi = require('joi');
const Router = require('@koa/router');

const {hasPermission, permissions} = require('../core/auth');
const bookCLService = require('../service/bookCollectionLinktable');

const validate = require("./_validation")

const getAllBookCL = async(ctx) =>{
    console.log("hello")
    ctx.body = await bookCLService.getAll();
}

const getBookCLById = async(ctx) =>{
    ctx.body = await bookCLService.getById(ctx.params.id);
}

getBookCLById.validationScheme = {
    params:Joi.object({
        id:Joi.number().integer().positive()
    })
}

const createNewBookCL = async(ctx) =>{
    const newBookCL = bookCLService.create({...ctx.request.body,
        bookCollectionId:ctx.request.body.bookCollectionId,
        bookId:ctx.request.body.bookId,
        progress:ctx.request.body.progress,
        review:ctx.request.body.review,
        isFavorite:ctx.request.body.isFavorite,
        isRead:ctx.request.body.isRead,
        title:ctx.request.body.title,
        subtitle:ctx.request.body.subtitle,
        imgLink:ctx.request.body.imgLink,
        authors:ctx.request.body.authors
    });
    ctx.body = await newBookCL;
    ctx.status = 201;

}
createNewBookCL.validationScheme = {
body:Joi.object({
    bookCollectionId:Joi.number().integer().positive().required(),
    bookId:Joi.string().optional(),
    progress:Joi.number().integer().positive().optional(),
    isFavorite:Joi.boolean().optional(),
    isRead:Joi.boolean().optional(),
    review:Joi.number().optional(),
    title:Joi.string().required(),
    subtitle:Joi.string().required(),
    imgLink:Joi.string().required(),
    authors:Joi.string().required()

})
}

const updateBookById = async (ctx) => {
    const updatedBookCL = bookCLService.updateById(ctx.params.id, {...ctx.request.body,
        review:ctx.request.body.review,
        progress:ctx.request.body.progress,
        isFavorite:ctx.request.body.isFavorite,
        isRead:ctx.request.body.isRead,
        

    });
    ctx.body = await updatedBookCL;
}

updateBookById.validationScheme = {
    params:Joi.object({
        id:Joi.number().integer().positive()
    }),
    body:Joi.object({
        review:Joi.number().optional(),
        progress:Joi.number().optional(),
        isFavorite:Joi.boolean().optional(),
        isRead:Joi.boolean().optional(),

        
    })
}

const deleteBookCLById = async(ctx) =>{
ctx.body = await bookCLService.deleteById(ctx.params.id);
ctx.status = 204;

}
deleteBookCLById.validationScheme = {
    params:Joi.object({
        id:Joi.number().integer().positive()
    })
}


module.exports = function installBookCRouter(app) {
    const router = new Router({
      prefix: '/bookCL',
    });

    router.get('/',hasPermission(permissions.loggedIn), getAllBookCL);
    router.get('/:id',hasPermission(permissions.loggedIn),validate(getBookCLById.validationScheme), getBookCLById);
    router.post('/',hasPermission(permissions.loggedIn), createNewBookCL);
    router.put('/:id',hasPermission(permissions.loggedIn),validate(updateBookById.validationScheme),updateBookById);
    router.delete('/:id',hasPermission(permissions.loggedIn),validate(deleteBookCLById.validationScheme), deleteBookCLById);

// ,validate(createNewBookCL.validationScheme)
app
.use(router.routes())
.use(router.allowedMethods());
};
const Joi = require('joi');
const Router = require('@koa/router');

const {hasPermission, permissions} = require('../core/auth');
const bookCData = require('../service/bookCollection');

const validate = require("./_validation");

const getAllBookC = async(ctx) =>{
ctx.body = await bookCData.getAll();
}

const getBookCById = async(ctx) =>{
ctx.body = await bookCData.getById(ctx.params.id);
}

getBookCById.validationScheme = {
params:Joi.object({
    id:Joi.number().integer().positive()
})
}

const createNewBookC = async(ctx) =>{
    const newBookC = await bookCData.create({...ctx.request.body,
        title:ctx.request.body.title,
        personId:ctx.request.body.personId,
        imgLink:ctx.request.body.imgLink,
        description:ctx.request.body.description,
    });
    ctx.body = await newBookC;
    ctx.status = 201;

}

createNewBookC.validationScheme = {
body:Joi.object({
    title:Joi.string().required(),
    personId:Joi.number().integer().positive().required(),
    imgLink:Joi.string().optional(),
    description:Joi.string().optional(),
})
}

const updateBookCById = async (ctx) => {
    console.log(ctx)
    const updatedBookC = await bookCData.updateById(ctx.params.id, {...ctx.request.body,
        title:ctx.request.body.title,
    });
    return updatedBookC;

    
}
updateBookCById.validationScheme = {
    params:Joi.object({
        id:Joi.number().integer().positive()
    }),
    body:Joi.object({
        title:Joi.string().required(),
    })
}

const deleteBookC = async(ctx) =>{
ctx.body = await bookCData.deleteById(ctx.params.id);
ctx.status = 204;

}
deleteBookC.validationScheme = {
params:Joi.object({
    id:Joi.number().integer().positive()
})
}
module.exports = function installBookCLRouter(app) {
    const router = new Router({
      prefix: '/bookC',
    });

    router.get('/', getAllBookC);
    router.get('/:id',hasPermission(permissions.loggedIn),validate(getBookCById.validationScheme), getBookCById);
    router.post('/',hasPermission(permissions.loggedIn),validate(createNewBookC.validationScheme), createNewBookC);
    router.put('/:id',hasPermission(permissions.loggedIn),validate(updateBookCById.validationScheme), updateBookCById);
    router.delete('/:id',hasPermission(permissions.loggedIn),validate(deleteBookC.validationScheme), deleteBookC);


app
.use(router.routes())
.use(router.allowedMethods());
};
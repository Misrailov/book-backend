const Joi = require ('joi');
const Router = require('@koa/router');

const {hasPermission, permissions} = require('../core/auth');
const personService = require ('../service/person');

const validate = require("./_validation")


const getAllPersons = async(ctx) =>{
    console.log(ctx.request.headers.authorisation)

    ctx.body = await personService.getAll();
};

// const getBooksFromPersonById = async(ctx) =>{
//     ctx.body = await personService.getBookCFromPersonId(ctx.request.body.id);
// }
// getBooksFromPersonById.validationScheme = {
//     body:Joi.object({
//         id:Joi.number().integer().positive(),
      
//     })
// }


const getUserById = async(ctx) =>{
    ctx.body =await personService.getById(ctx.params.id);
}

getUserById.validationScheme = {
    params:Joi.object({
        id:Joi.number().integer().positive()

    })
}

const createNewPerson = async(ctx) =>{
    


const newPerson = personService.create({...ctx.request.body,
    //with authentication
    auth0Id:ctx.state.user.sub,

    // without authentication
        // auth0Id:ctx.request.body.auth0Id,
		firstName:ctx.request.body.firstName,
		lastName:ctx.request.body.lastName,
		email: ctx.request.body.email,
	});
	ctx.body =await newPerson;
    ctx.status = 201;
}
createNewPerson.validationScheme = {
body:Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email: Joi.string(),
    //without authentication
    auth0Id:Joi.string().required(),
    
})
}

const updatePersonById = async(ctx) =>{
	const updatedPerson = personService.updateById(ctx.params.id, {...ctx.request.body,
		firstName:ctx.request.body.firstName,
		lastName:ctx.request.body.lastName,
		email: ctx.request.body.email,
        //without authenticatio
        //  auth0Id:ctx.request.body.auth0Id,
        //with authentication
        auth0Id: ctx.state.user.sub
	});
	ctx.body = await updatedPerson;
}

updatePersonById.validationScheme = {
    params:Joi.object({
        id:Joi.number().integer().positive()
    }),
    body:Joi.object({
    firstName:Joi.string(),
    lastName:Joi.string(),
    email:Joi.string().email(),
    //without authentication
    auth0Id:Joi.string(),
    })
}

const deletePersonById = async(ctx) =>{
     await personService.deleteById(ctx.params.id);
    ctx.status = 204;
}

deletePersonById.validationScheme = {
    params:Joi.object({
    id:Joi.number().integer().positive()
    })

}

module.exports = function installPersonsRouter(app) {
    const router = new Router({
      prefix: '/persons',
    });
    router.get('/',getAllPersons);
    router.get('/:id',hasPermission(permissions.loggedIn),validate(getUserById.validationScheme), getUserById);
    router.post('/' ,hasPermission(permissions.loggedIn),validate(createNewPerson.validationScheme),createNewPerson);
    router.put('/:id',hasPermission(permissions.loggedIn), validate(updatePersonById.validationScheme),updatePersonById);
    router.delete('/:id',hasPermission(permissions.loggedIn),validate(deletePersonById.validationScheme), deletePersonById);

app
.use(router.routes())
.use(router.allowedMethods());
};
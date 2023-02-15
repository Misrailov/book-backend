const Router = require('@koa/router');

const installPersonsRouter = require('./persons');
const installBookCLRouter = require('./bookCollectionLinktable');
const installBookCRouter = require('./bookCollection');

module.exports = (app) => {
    const router = new Router({
      prefix: '/api',
    });
  
    installPersonsRouter(router);
    installBookCLRouter(router);
    installBookCRouter(router);

  
    app.use(router.routes()).use(router.allowedMethods());
  };
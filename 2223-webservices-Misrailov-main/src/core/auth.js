const jwksrsa = require('jwks-rsa');
const jwt = require('koa-jwt');
const config = require('config');
const axios = require('axios');

const ServiceError = require('../core/serviceError');
const {getLogger} = require('../core/logging');
const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
  };


function getJwtSecret() {
  try {
    let secretFunction = jwksrsa.koaJwtSecret({
      jwksUri: config.get('auth.jwksUri'), // 👈
      cache: true,
      cacheMaxEntries: 5,
  });
  return secretFunction;
 } catch (error) {
  console.error(error);
  throw error;
 }
}



function checkJwtToken() {
  debugLog("checking jwt token")
  try {
    let secretFunction = getJwtSecret();
    return jwt({
      secret: secretFunction,
      audience: config.get('auth.audience'),
      issuer: config.get('auth.issuer'),
      algorithms: ['RS256'],
      passthrough: true, // 👈 
    });

  } catch (error) {
    throw new ServiceError.internalServerError('Unable to verify JWT token');
  }

}


const AUTH_USER_INFO = config.get('auth.userInfo');


async function addUserInfo(ctx) {
  const logger = getLogger();
  try {
    const token = ctx.headers.authorization;
    const url = AUTH_USER_INFO;
    if (token && url && ctx.state.user) {
      logger.debug(`addUserInfo: ${url}, ${JSON.stringify(token)}`);

      const userInfo = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      ctx.state.user = {
        ...ctx.state.user,
        ...userInfo.data,
      };
    }
  } catch (error) {
    console.log(error)
    logger.error(error);
    throw error;
  }
}
const permissions = Object.freeze({
  loggedIn: 'loggedIn',
  read: 'read',
  write: 'write',
});

function hasPermission(permission) {
  return async (ctx, next) => {
    const logger = getLogger();
    const user = ctx.state.user;

    logger.debug(`hasPermission: ${JSON.stringify(user)}`);

    // simply having a user object means they are logged in
  
    if (user && permission === permissions.loggedIn) {  // 👈
      await next();
    } else if (user && user.permissions && user.permissions.includes(permission)) {
      await next();
    } else {
      ctx.throw(403, 'You are not allowed to view this part of the application', {
        code: 'FORBIDDEN',
      });
    }
  };
}

module.exports = {
  checkJwtToken,
  hasPermission,
  permissions,
  addUserInfo
 };
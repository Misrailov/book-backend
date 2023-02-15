
module.exports = {
	env: 'NODE_ENV',
	port: 'PORT',
	auth: {
		jwksUri: 'AUTH_JWKS_URI',
		audience: "AUTH_AUDIENCE",
		issuer: "AUTH_ISSUER",
		userInfo: "AUTH_USER_INFO",
		tokenUrl: 'AUTH_TOKEN_URL',
		clientId: 'AUTH_CLIENT_ID',
		clientSecret: 'AUTH_TEST_USER_CLIENT_SECRET',
		testUser: {
		userId: 'AUTH_TEST_USER_USER_ID',
		username: 'AUTH_TEST_USER_USERNAME',
		password: 'AUTH_TEST_USER_PASSWORD',
		}
	},
	database:{
		client: 'DATABASE_CLIENT',
		host: 'DATABASE_HOST',
		port: 'DATABASE_PORT',
		name: 'DATABASE_NAME',
		username: 'DATABASE_USERNAME',
		password: 'DATABASE_PASSWORD',
		url: 'DATABASE_URL',


	},
	
}
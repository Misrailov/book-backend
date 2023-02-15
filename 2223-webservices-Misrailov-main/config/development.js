module.exports = {
	port:"PORT",
	log: {
		level: 'silly',
		disabled: false,
	},

cors: {
	origins: ['http://localhost:3000'],
	maxAge: 3 * 60 * 60,
},
database: {
	client: 'mysql2',
	host: 'vichogent.be',
	port: 40043,
	name: '079094mi',
	username: '079094mi',
	password: 'XwQfvcFpMw5HaESpWrPN',
},

};
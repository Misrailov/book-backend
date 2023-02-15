module.exports = {
	log: {
		level: 'silly',
		disabled: true,
	},

cors: {
	origins: ['http://localhost:3000'],
	maxAge: 3 * 60 * 60,
},
database: {
	client: 'mysql2',
	host: 'vichogent.be',
	port: 40043,
	name: 'betterreading_test',
	username: '079094mi',
	password: 'XwQfvcFpMw5HaESpWrPN',
},

};
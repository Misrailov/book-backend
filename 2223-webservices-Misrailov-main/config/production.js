module.exports = {
	port:"PORT",
	log: {
		level: 'info',
		disabled: false,
	},

cors: {
	origins: ['https://frontendweb-misrailov.onrender.com'],
	maxAge: 3 * 60 * 60,
}
,
database: {
	client: 'mysql2',
	host: 'vichogent.be',
	port: 40043,
	name: '079094mi',
	username: '079094mi',
	password: 'XwQfvcFpMw5HaESpWrPN',
},
};
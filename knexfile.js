module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/garden'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}

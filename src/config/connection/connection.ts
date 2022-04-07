import { sequelize } from './sequelizeHelper'
const connect = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log('Postgresql Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the postgresql database:', err)
      throw err
    })
}

export { connect }

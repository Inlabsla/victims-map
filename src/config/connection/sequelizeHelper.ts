import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  host: process.env.BD_HOST,
  port: process.env.BD_PORT ? parseInt(process.env.BD_PORT) : 5432,
  database: process.env.BD_NAME,
  dialect: 'postgres',
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  logging: console.log,
  define: {
    underscored: true,
  },
})

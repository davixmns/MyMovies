import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD
const host = process.env.HOST
const port = process.env.DB_PORT

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: 'mysql',
    host: host,
    port: port,
})

console.log("DB_NAME: ", dbName)
console.log("DB_USER: ", dbUser)
console.log("DB_PASSWORD: ", dbPass)
console.log("HOST: ", host)
console.log("PORT: ", port)

sequelize.authenticate()
    .then(() => {
        sequelize.sync({ force: false })
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });




export default sequelize;
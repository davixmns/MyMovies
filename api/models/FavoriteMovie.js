import database from "../database/DB.js";
import Sequelize from "sequelize";
import User from "./User.js";

const FavoriteMovie = database.define("favorite_movie", {
    favorite_movie_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tmdb_movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    poster_path: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

FavoriteMovie.belongsTo(User, {
    foreignKey: "user_id",
})

export default FavoriteMovie;
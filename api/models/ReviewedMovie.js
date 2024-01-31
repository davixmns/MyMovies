import database from "../database/DB.js";
import Sequelize from "sequelize";
import User from "./User.js";

const ReviewedMovie = database.define("reviewed_movie", {
    reviewed_movie_id: {
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
    review: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

ReviewedMovie.belongsTo(User, {
    foreignKey: "user_id"
})

export default ReviewedMovie;
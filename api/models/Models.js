import Sequelize from 'sequelize';
import database from '../database/DB.js';

export const User = database.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profile_picture: {
        type: Sequelize.STRING,
        allowNull: true
    },
})

export const FavoriteMovie = database.define("favorite_movie", {
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

export const Genre = database.define('genre', {
    genre_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tmdb_genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false
})

export const FavoriteMovieGenre = database.define('favorite_movie_genre', {
    favorite_movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: FavoriteMovie,
            key: 'favorite_movie_id'
        }
    },
    genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Genre,
            key: 'genre_id'
        }
    }
}, {
    timestamps: false
});

export const Comment = database.define("comment", {
    comment_id: {
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
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Comment.belongsTo(User, {
    foreignKey: "user_id"
})

FavoriteMovie.belongsTo(User, {
    foreignKey: "user_id",
})

FavoriteMovie.belongsToMany(Genre, {
    through: FavoriteMovieGenre,
    foreignKey: 'favorite_movie_id'
});

Genre.belongsToMany(FavoriteMovie, {
    through: FavoriteMovieGenre,
    foreignKey: 'genre_id'
});
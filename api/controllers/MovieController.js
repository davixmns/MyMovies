import {FavoriteMovie, FavoriteMovieGenre, Genre} from "../models/Models.js";
import axios from "axios";

export default {
    async favoriteMovie(req, res) {
        try {
            const userId = req.user_id
            const {tmdb_movie_id, title, poster_path, genres} = req.body
            if (!tmdb_movie_id || !title) return res.status(400).json({message: 'Preencha todos os campos'})
            const favorite = await FavoriteMovie.findOne({where: {tmdb_movie_id: tmdb_movie_id}})
            if (favorite) return res.status(400).json({message: 'Filme já favoritado'})
            const favoritedMovie = await FavoriteMovie.create({tmdb_movie_id, title, poster_path, user_id: userId})
            for (const genre of genres) {
                const genreOnDatabase = await Genre.findOne({where: {tmdb_genre_id: genre.id}})
                await FavoriteMovieGenre.create({
                    favorite_movie_id: favoritedMovie.favorite_movie_id,
                    genre_id: genreOnDatabase.genre_id
                })
            }
            return res.status(201).json({message: 'Filme favoritado com sucesso'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao favoritar filme'})
        }
    },

    async unfavoriteMovie(req, res) {
        try {
            const userId = req.user_id
            const {tmdb_movie_id} = req.params
            if (!tmdb_movie_id) return res.status(400).json({message: 'Preencha todos os campos'})
            const favorite = await FavoriteMovie.findOne({where: {tmdb_movie_id: tmdb_movie_id}})
            if (!favorite) return res.status(400).json({message: 'Filme não favoritado'})
            await FavoriteMovieGenre.destroy({where: {favorite_movie_id: favorite.favorite_movie_id}})
            await FavoriteMovie.destroy({where: {tmdb_movie_id: tmdb_movie_id, user_id: userId}})
            return res.status(200).json({message: 'Filme desfavoritado com sucesso'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao desfavoritar filme'})
        }
    },

    async checkIfMovieIsFavorited(req, res) {
        try {
            const userId = req.user_id
            const {tmdb_movie_id} = req.params
            if (!tmdb_movie_id) return res.status(400).json({message: 'Preencha todos os campos'})
            const favorited = await FavoriteMovie.findOne({where: {tmdb_movie_id: tmdb_movie_id, user_id: userId}})
            if (favorited) {
                return res.status(200).send(true)
            } else {
                return res.status(200).send(false)
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao verificar se filme é favorito'})
        }
    },

    async getAllFavoriteMovies(req, res) {
        try {
            const userId = req.user_id
            const favorites = await FavoriteMovie.findAll({where: {user_id: userId}})
            return res.status(200).json(favorites)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao buscar filmes favoritos'})
        }
    },

    async getFavoriteGenres(req, res) {
        try {
            const favoriteMovies = await FavoriteMovie.findAll({where: {user_id: req.user_id}})
            if (favoriteMovies.length === 0) return res.status(400).json({message: 'Nenhum filme favoritado'})
            const favoriteGenres = []

            for (const favoriteMovie of favoriteMovies) {
                const genres = await FavoriteMovieGenre.findAll({where: {favorite_movie_id: favoriteMovie.favorite_movie_id}})
                for (const genre of genres) {
                    const genreOnDatabase = await Genre.findOne({where: {genre_id: genre.genre_id}})
                    favoriteGenres.push({id: genreOnDatabase.tmdb_genre_id, name: genreOnDatabase.name})
                }
            }

            const genresCounter = []
            for (const genre of favoriteGenres) {
                const index = genresCounter.findIndex(g => g.id === genre.id)
                if (index !== -1) {
                    genresCounter[index].count++
                } else {
                    genresCounter.push({...genre, count: 1})
                }
            }

            //deixar em ordem decrescente
            genresCounter.sort((a, b) => b.count - a.count)
            //deixar os primeiros 5 gêneros
            const top5Genres = genresCounter.slice(0, 5)

            return res.status(200).json(top5Genres)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao buscar gêneros favoritos'})
        }
    },

    async getMovieRecommendation(req, res) {
        try {
            const favoriteMovies = await FavoriteMovie.findAll({where: {user_id: req.user_id}})
            if (favoriteMovies.length === 0) return res.status(400).json({message: 'Nenhum filme favoritado'})
            const favoriteGenres = []
            for (const favoriteMovie of favoriteMovies) {
                const genres = await FavoriteMovieGenre.findAll({where: {favorite_movie_id: favoriteMovie.favorite_movie_id}})
                for (const genre of genres) {
                    const genreOnDatabase = await Genre.findOne({where: {genre_id: genre.genre_id}})
                    favoriteGenres.push({id: genreOnDatabase.tmdb_genre_id, name: genreOnDatabase.name})
                }
            }
            const genresCounter = []
            for (const genre of favoriteGenres) {
                const index = genresCounter.findIndex(g => g.id === genre.id)
                if (index !== -1) {
                    genresCounter[index].count++
                } else {
                    genresCounter.push({...genre, count: 1})
                }
            }
            genresCounter.sort((a, b) => b.count - a.count)
            const top1Genre = genresCounter[0]
            const movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${top1Genre.id}`)
            const moviesData = movies.data.results
            const filteredMovies = moviesData.filter(movie => movie.vote_average >= 7)
            const randomMovieIndex = Math.floor(Math.random() * filteredMovies.length)

            return res.status(200).json(filteredMovies[randomMovieIndex])
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao buscar recomendação de filme'})
        }
    }
}

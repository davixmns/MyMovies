import FavoriteMovie from "../models/FavoriteMovie.js";

export default {
    async favoriteMovie(req, res) {
        try {
            console.log('favoriteMovie')
            const userId = req.user_id
            const {tmdb_movie_id, title, poster_path} = req.body
            if (!tmdb_movie_id || !title || !poster_path) {
                return res.status(400).json({message: 'Preencha todos os campos'})
            }
            const favorite = await FavoriteMovie.findOne({where: {tmdb_movie_id: tmdb_movie_id}})
            if (favorite) {
                return res.status(400).json({message: 'Filme já favoritado'})
            }
            await FavoriteMovie.create({tmdb_movie_id, title, poster_path, user_id: userId})
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
            if (!tmdb_movie_id) {
                return res.status(400).json({message: 'Preencha todos os campos'})
            }
            const favorite = await FavoriteMovie.findOne({where: {tmdb_movie_id: tmdb_movie_id}})
            if (!favorite) {
                return res.status(400).json({message: 'Filme não favoritado'})
            }
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
    }
}
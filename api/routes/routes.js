
import {Router} from 'express';
import AuthController from "../controllers/AuthController.js";
import UserController from "../controllers/UserController.js";
import middleware from "../middlewares/middleware.js";
import MovieController from "../controllers/MovieController.js";

const router = Router();

router.post('/login', AuthController.login)
router.post('/user', UserController.createUserAccount)
router.post('/verify-jwt', middleware.verifyUserJWT, AuthController.confirmJWT)
router.post('/favorite-movie', middleware.verifyUserJWT, MovieController.favoriteMovie)
router.delete(`/favorite-movie/:tmdb_movie_id`, middleware.verifyUserJWT, MovieController.unfavoriteMovie)
router.get(`/favorite-movie/:tmdb_movie_id`, middleware.verifyUserJWT, MovieController.checkIfMovieIsFavorited)
router.get(`/favorite-movies`, middleware.verifyUserJWT, MovieController.getAllFavoriteMovies)
router.get(`/favorite-genres`, middleware.verifyUserJWT, MovieController.getFavoriteGenres)
router.get(`/movie-recommendation`, middleware.verifyUserJWT, MovieController.getMovieRecommendation)

export default router;
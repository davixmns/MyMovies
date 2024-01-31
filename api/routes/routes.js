import middleware from '../middlewares/middleware.js';
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";
import MovieController from "../controllers/MovieController.js";
import {Router} from 'express';

const router = Router();

router.post('/login', AuthController.login)
router.post('/user', UserController.createUserAccount)
router.post('/verify-jwt', middleware.verifyUserJWT, AuthController.confirmJWT)
router.post('/favorite-movie', middleware.verifyUserJWT, MovieController.favoriteMovie)
router.delete(`/favorite-movie/:tmdb_movie_id`, middleware.verifyUserJWT, MovieController.unfavoriteMovie)
router.get(`/favorite-movie/:tmdb_movie_id`, middleware.verifyUserJWT, MovieController.checkIfMovieIsFavorited)
router.get(`/favorite-movies`, middleware.verifyUserJWT, MovieController.getAllFavoriteMovies)

export default router;
import {Router} from 'express';
import AuthController from "../controllers/AuthController.js";
import UserController from "../controllers/UserController.js";
import middleware from "../middlewares/middleware.js";
import MovieController from "../controllers/MovieController.js";
import upload from "../multer.js";

const router = Router();

router.post('/login', AuthController.login)
router.post('/user', UserController.createUserAccount)
router.put('/user', middleware.verifyUserJWT, middleware.verifyUserUpdateForm, UserController.updateUserAccount)
router.get('/uploads', middleware.verifyUserJWT, UserController.getProfilePicture)
router.post('/profile-picture', middleware.verifyUserJWT, upload.single('file'), UserController.uploadProfilePicture)
router.post('/verify-jwt', middleware.verifyUserJWT, AuthController.getUser)
router.post('/favorite-movie', middleware.verifyUserJWT, MovieController.favoriteMovie)
router.delete(`/favorite-movie/:tmdb_movie_id`, middleware.verifyUserJWT, MovieController.unfavoriteMovie)
router.get(`/favorite-movie/:tmdb_movie_id`, middleware.verifyUserJWT, MovieController.checkIfMovieIsFavorited)
router.get(`/favorite-movies`, middleware.verifyUserJWT, MovieController.getAllFavoriteMovies)
router.get(`/favorite-genres`, middleware.verifyUserJWT, MovieController.getFavoriteGenres)
router.post(`/comment`, middleware.verifyUserJWT, MovieController.createMovieComment)
router.get(`/comments/:tmdb_movie_id`, MovieController.getMovieComments)

//ver fotos com multer


export default router;
import axios from 'axios';
import {Genre} from "../models/Models.js";

const TMDB_URL = 'https://api.themoviedb.org/3/genre/movie/list?'

export async function createMovieGenres(){
    await axios.get(`${TMDB_URL}api_key=${process.env.TMDB_API_KEY}&language=en-US`)
        .then((response) => {
            const genres = response.data.genres
            genres.forEach(async (genre) => {
                const genreExists = await Genre.findOne({where: {tmdb_genre_id: genre.id}})
                if (!genreExists) {
                    await Genre.create({tmdb_genre_id: genre.id, name: genre.name})
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
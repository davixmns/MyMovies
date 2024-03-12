import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import {createMovieGenres} from "./seeds/seeds.js";
import {Comment, FavoriteMovie, FavoriteMovieGenre, Genre, User} from "./models/Models.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true, parameterLimit: 100000}))
app.use(express.json());

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//get images with multer
app.use('/uploads', express.static('uploads'));

app.use('/', (req, res) => {
    res.send('MY MOVIES API OK!');
})

async function init() {
    await User.sync()
    await FavoriteMovie.sync()
    await Genre.sync()
    await FavoriteMovieGenre.sync()
    await Comment.sync()
    await createMovieGenres()
}

init()


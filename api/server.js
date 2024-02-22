import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import {createMovieGenres} from "./seeds/seeds.js";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true , parameterLimit: 10000000}))
app.use(express.json());

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//get images with multer
app.use('/uploads', express.static('uploads'));

app.use('/' , (req, res) => {
    res.send('MY MOVIES API OK!');
})

createMovieGenres()
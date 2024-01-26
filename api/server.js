const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const SECRET_KEY = 'Oj1CmCTOtK5Wk7SC4ESsYdroJb1zHIQy';

// Rota para criar um token JWT
app.post('/login', (req, res) => {
    const email = req.body.email
    const token = jwt.sign({email}, SECRET_KEY, { expiresIn: '1y' });
    res.status(200).send({ token });
});

// Rota para verificar um token JWT
app.get('/verify-jwt', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]; // Token JWT vindo do cabeçalho Authorization
    const decoded = jwt.verify(token, SECRET_KEY);

    if(decoded) {
        res.status(200).send({ message: 'Token válido' });
    } else {
        res.status(401).send({ message: 'Token inválido' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

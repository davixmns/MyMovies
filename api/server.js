const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const SECRET_KEY = 'Oj1CmCTOtK5Wk7SC4ESsYdroJb1zHIQy';

app.use(express.json());

// Rota para criar um token JWT
app.post('/sign-jwt', (req, res) => {
    const email = req.body.email
    const token = jwt.sign({email}, SECRET_KEY, { expiresIn: '1y' });
    console.log(`Token gerado: ${token}`);
    res.status(200).send({ token });
});

// Rota para verificar um token JWT
app.post('/verify-jwt', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]; // Token JWT vindo do cabeçalho Authorization
    const decoded = jwt.verify(token, SECRET_KEY);

    if(decoded) {
        console.log('Token válido')
        res.status(200).send({decoded: decoded, message: 'Token válido' });
    } else {
        console.log('Token inválido')
        res.status(401).send({ message: 'Token inválido' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

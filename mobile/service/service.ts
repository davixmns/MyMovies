import axios from 'axios';

export function signJWT(email: string) {
    axios.post('http://localhost:3000/sign-jwt', {email})
        .then(res => res.data)
        .catch(err => console.log(err))
}

export function verifyJWT(token: string) {
    axios.post('http://localhost:3000/verify-jwt', {token})
        .then(res => res.data)
        .catch(err => console.log(err))
}


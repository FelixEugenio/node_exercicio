const express = require('express');
const uuid = require('uuid');

const uuidv4 = uuid.v4;

const app = express();

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req, res) => {
    const {name , email , password} = req.body;

    const verifyIfUserAlreadyExists = users.find((user) => user.email === email)

    if(verifyIfUserAlreadyExists) {
        return res.status(400).json({error: 'User already exists'});
    }
    
    const user = {
        id: uuidv4(),
        name,
        email,
        password
    }

    users.push(user);
    res.status(201).json(user);
});

app.listen(3000, () => console.log('Server running on port 3000'));
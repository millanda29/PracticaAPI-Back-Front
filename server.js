const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Datos simulados en memoria
let users = [
    { id: 1, name: "John Doe", edad: 30, estadisticas: { clicksEnLaPagina: 100, tiempoEnLaPagina: 60, permisoVerEstadistica: true } },
    { id: 2, name: "Jane Smith", edad: 25, estadisticas: { clicksEnLaPagina: 150, tiempoEnLaPagina: 90, permisoVerEstadistica: false } },
    { id: 3, name: "Alice Johnson", edad: 28, estadisticas: { clicksEnLaPagina: 200, tiempoEnLaPagina: 120, permisoVerEstadistica: true } },
    { id: 4, name: "Bob Brown", edad: 35, estadisticas: { clicksEnLaPagina: 250, tiempoEnLaPagina: 150, permisoVerEstadistica: false } },
    { id: 5, name: "Charlie Davis", edad: 22, estadisticas: { clicksEnLaPagina: 300, tiempoEnLaPagina: 180, permisoVerEstadistica: true } },
    { id: 6, name: "David Wilson", edad: 40, estadisticas: { clicksEnLaPagina: 350, tiempoEnLaPagina: 120, permisoVerEstadistica: false } }
];

// GET todos los usuarios
app.get('/users', (req, res) => {
    res.json(users);
});

// GET usuario por ID (param)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// POST -> crear usuario
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        edad: req.body.edad || null,
        estadisticas: req.body.estadisticas || {}
    };
    users.push(user);
    res.status(201).json(user);
});

// PUT -> actualizar usuario
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name || user.name;
    user.edad = req.body.edad || user.edad;
    user.estadisticas = req.body.estadisticas || user.estadisticas;

    res.json(user);
});

// DELETE -> eliminar usuario por id (query opcional o param)
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
});

app.use('/static', express.static('static'));

// Iniciar servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('Local: http://localhost:3000');
    console.log('Network: http://127.0.0.1:3000');
    console.log('Ctrl+C to stop the server');
});

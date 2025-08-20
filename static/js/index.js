// ---------------------------
// Variables globales (inputs)
// ---------------------------

// GET by ID
const inputGetId = document.getElementById("getUsuarioId");

// POST
const inputPostNombre = document.getElementById("postUsuarioNombre");
const inputPostEdad = document.getElementById("postUsuarioEdad");
const inputPostClicks = document.getElementById("postUsuarioClicks");
const inputPostTiempo = document.getElementById("postUsuarioTiempo");
const inputPostPermiso = document.getElementById("postUsuarioPermiso");

// PUT
const inputPutId = document.getElementById("putUsuarioId");
const inputPutNombre = document.getElementById("putUsuarioNombre");
const inputPutEdad = document.getElementById("putUsuarioEdad");
const inputPutClicks = document.getElementById("putUsuarioClicks");
const inputPutTiempo = document.getElementById("putUsuarioTiempo");
const inputPutPermiso = document.getElementById("putUsuarioPermiso");

// DELETE
const inputDeleteId = document.getElementById("deleteUsuarioId");

// ---------------------------
// Función para llenar la tabla
// ---------------------------
function renderUsuariosTabla(users) {
    const tbody = document.querySelector('#usuariosTable tbody');
    tbody.innerHTML = ''; // Limpiar tabla antes de llenar

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.edad || ''}</td>
            <td>${user.estadisticas?.clicksEnLaPagina || 0}</td>
            <td>${user.estadisticas?.tiempoEnLaPagina || 0}</td>
            <td>${user.estadisticas?.permisoVerEstadistica ? 'Sí' : 'No'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ---------------------------
// GET by ID
// ---------------------------
function getByIdUsuario() {
    const usuarioId = inputGetId.value.trim();
    if (!usuarioId) return getUsuarios(); // Si no hay ID, obtener todos

    fetch(`http://127.0.0.1:3000/users/${usuarioId}`)
        .then(res => {
            if (!res.ok) throw new Error('User not found');
            return res.json();
        })
        .then(data => renderUsuariosTabla([data]))
        .catch(err => console.error('Error fetching user by ID:', err));
}

// ---------------------------
// GET all
// ---------------------------
function getUsuarios() {
    fetch('http://127.0.0.1:3000/users')
        .then(res => res.json())
        .then(data => renderUsuariosTabla(data))
        .catch(err => console.error('Error fetching users:', err));
}

// ---------------------------
// POST
// ---------------------------
function createUsuario() {
    const nuevoUsuario = {
        name: inputPostNombre.value.trim(),
        edad: parseInt(inputPostEdad.value) || null,
        estadisticas: {
            clicksEnLaPagina: parseInt(inputPostClicks.value) || 0,
            tiempoEnLaPagina: parseInt(inputPostTiempo.value) || 0,
            permisoVerEstadistica: inputPostPermiso.checked
        }
    };

    fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
    })
        .then(res => res.json())
        .then(data => getUsuarios()) // Refrescar tabla
        .catch(err => console.error('Error creating user:', err));
}

// ---------------------------
// PUT
// ---------------------------
function putUsuario() {
    const usuarioId = inputPutId.value.trim();
    const updatedUsuario = {
        name: inputPutNombre.value.trim(),
        edad: parseInt(inputPutEdad.value) || null,
        estadisticas: {
            clicksEnLaPagina: parseInt(inputPutClicks.value) || 0,
            tiempoEnLaPagina: parseInt(inputPutTiempo.value) || 0,
            permisoVerEstadistica: inputPutPermiso.checked
        }
    };

    fetch(`http://127.0.0.1:3000/users/${usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUsuario)
    })
        .then(res => {
            if (!res.ok) throw new Error('User not found');
            return res.json();
        })
        .then(data => getUsuarios())
        .catch(err => console.error('Error updating user:', err));
}

// ---------------------------
// DELETE
// ---------------------------
function deleteUsuario() {
    const usuarioId = inputDeleteId.value.trim();

    fetch(`http://127.0.0.1:3000/users/${usuarioId}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('User not found');
            return res.json();
        })
        .then(data => getUsuarios())
        .catch(err => console.error('Error deleting user:', err));
}

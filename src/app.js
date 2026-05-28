const express = require('express');

const app = express();

app.use(express.json());


let contacts = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@test.com',
        phone: '3001234567'
    }
];

let nextId = 2;


function resetData() {
    contacts = [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@test.com',
            phone: '3001234567'
        }
    ];

    nextId = 2;
}


app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
    const contact = contacts.find(
        c => c.id === Number(req.params.id)
    );

    if (!contact) {
        return res.status(404).json({
            error: 'Contacto no encontrado'
        });
    }

    res.json(contact);
});


app.post('/api/contacts', (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({
            error: 'El nombre es requerido'
        });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({
            error: 'Email inválido'
        });
    }

    const newContact = {
        id: nextId++,
        name: name.trim(),
        email: email.trim(),
        phone: phone || ''
    };

    contacts.push(newContact);

    res.status(201).json(newContact);
});


app.put('/api/contacts/:id', (req, res) => {
    const contact = contacts.find(
        c => c.id === Number(req.params.id)
    );

    if (!contact) {
        return res.status(404).json({
            error: 'Contacto no encontrado'
        });
    }

    const { name, email, phone } = req.body;

    if (name !== undefined) {
        contact.name = name;
    }

    if (email !== undefined) {
        if (!email.includes('@')) {
            return res.status(400).json({
                error: 'Email inválido'
            });
        }

        contact.email = email;
    }

    if (phone !== undefined) {
        contact.phone = phone;
    }

    res.json(contact);
});


app.delete('/api/contacts/:id', (req, res) => {
    const index = contacts.findIndex(
        c => c.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            error: 'Contacto no encontrado'
        });
    }

    contacts.splice(index, 1);

    res.json({
        message: 'Contacto eliminado correctamente'
    });
});

module.exports = {
    app,
    resetData
};
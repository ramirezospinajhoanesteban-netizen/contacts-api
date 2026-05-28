const service = require('../services/contacts.service');

// GET todos
exports.getAll = (req, res) => {
    const contacts = service.getAll(req.query);
    res.json(contacts);
};

// GET por id
exports.getById = (req, res) => {
    const contact = service.getById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json(contact);
};

// POST
exports.create = (req, res) => {
    const newContact = service.create(req.body);
    res.status(201).json(newContact);
};

// PUT
exports.update = (req, res) => {
    const updated = service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json(updated);
};

// PATCH favorite
exports.toggleFavorite = (req, res) => {
    const contact = service.toggleFavorite(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json(contact);
};

// DELETE
exports.remove = (req, res) => {
    const deleted = service.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json(deleted);
};
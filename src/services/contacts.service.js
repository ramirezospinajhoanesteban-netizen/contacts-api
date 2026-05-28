let contacts = [];
let nextId = 4;

function resetContacts() {
    contacts = [
        {
            id: 1,
            name: 'Ana García',
            email: 'ana@example.com',
            phone: '555-0001',
            favorite: false,
            createdAt: '2024-01-10T08:00:00.000Z'
        },
        {
            id: 2,
            name: 'Luis Pérez',
            email: 'luis@example.com',
            phone: '555-0002',
            favorite: true,
            createdAt: '2024-01-11T09:00:00.000Z'
        },
        {
            id: 3,
            name: 'Eva Martínez',
            email: 'eva@example.com',
            phone: null,
            favorite: false,
            createdAt: '2024-01-12T10:00:00.000Z'
        }
    ];

    nextId = 4;
}

function getAll(query = {}) {
    let result = [...contacts];

    if (query.favorite !== undefined) {
        const isFavorite = query.favorite === 'true';
        result = result.filter(c => c.favorite === isFavorite);
    }

    return result;
}

function getById(id) {
    return contacts.find(c => c.id === Number(id)) || null;
}

function create(data) {
    const newContact = {
        id: nextId++,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        favorite: data.favorite || false,
        createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    return newContact;
}

function update(id, data) {
    const index = contacts.findIndex(c => c.id === Number(id));
    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...data, id: contacts[index].id };
    return contacts[index];
}

function remove(id) {
    const index = contacts.findIndex(c => c.id === Number(id));
    if (index === -1) return null;

    const deleted = contacts[index];
    contacts.splice(index, 1);
    return deleted;
}

function toggleFavorite(id) {
    const contact = contacts.find(c => c.id === Number(id));
    if (!contact) return null;

    contact.favorite = !contact.favorite;
    return contact;
}

// Inicializar datos al arrancar
resetContacts();

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    toggleFavorite,
    resetContacts
};
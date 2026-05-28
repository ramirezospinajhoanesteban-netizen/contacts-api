const request = require('supertest');
const app = require('../src/app');
const { resetContacts } = require('../src/services/contacts.service');

beforeEach(() => {
    resetContacts();
});

// GET /contacts
test('GET /contacts debe retornar todos los contactos', async () => {
    const res = await request(app).get('/contacts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
});

test('GET /contacts?favorite=true debe retornar solo favoritos', async () => {
    const res = await request(app).get('/contacts?favorite=true');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(c => c.favorite === true)).toBe(true);
});

// GET /contacts/:id
test('GET /contacts/:id debe retornar un contacto por id', async () => {
    const res = await request(app).get('/contacts/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
});

test('GET /contacts/:id debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/contacts/999');
    expect(res.statusCode).toBe(404);
});

// POST /contacts
test('POST /contacts debe crear un nuevo contacto', async () => {
    const newContact = { name: 'Carlos López', email: 'carlos@example.com', phone: '555-0004' };
    const res = await request(app).post('/contacts').send(newContact);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Carlos López');
    expect(res.body.id).toBeDefined();
});

// PUT /contacts/:id
test('PUT /contacts/:id debe actualizar un contacto', async () => {
    const res = await request(app).put('/contacts/1').send({ name: 'Ana Actualizada' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Ana Actualizada');
});

// PATCH /contacts/:id/favorite
test('PATCH /contacts/:id/favorite debe alternar el favorito', async () => {
    const before = await request(app).get('/contacts/1');
    const res = await request(app).patch('/contacts/1/favorite');
    expect(res.statusCode).toBe(200);
    expect(res.body.favorite).toBe(!before.body.favorite);
});

// DELETE /contacts/:id
test('DELETE /contacts/:id debe eliminar un contacto', async () => {
    const res = await request(app).delete('/contacts/1');
    expect(res.statusCode).toBe(200);

    const check = await request(app).get('/contacts/1');
    expect(check.statusCode).toBe(404);
});
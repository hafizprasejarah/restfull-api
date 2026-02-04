import supertest from "supertest";
import { web } from "../src/application/web";
import { removeTestUser } from "../test/test-util.js";
import { createTestUser, removeAllTestContacts, createTestContact, getTestContact } from "../test/test-util.js";
import { getUser } from "../test/test-util.js";
import { logger } from "../src/application/logging";

describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('it should can create new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: 'test',
                last_name: 'test',
                email: 'test@example.com',
                phone: '081234567890'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe('test');
        expect(result.body.data.last_name).toBe('test');
        expect(result.body.data.email).toBe('test@example.com');
        expect(result.body.data.phone).toBe('081234567890');
    });

    it('it should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: 'test',
                email: 'test',
                phone: '0812345678904234234324342432423432'
            });
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});


describe('GET /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('it should can get contact by id', async () => {

        const testContact = await getTestContact();
        const result = await supertest(web)
            .get('/api/contacts/' + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    it('it should return 404 if contact is not found', async () => {

        const testContact = await getTestContact();
        const result = await supertest(web)
            .get('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('it should can update contact by id', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: 'Hafiz',
                last_name: 'Pratama',
                email: 'updated@example.com',
                phone: '081234567891'
            })

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe('Hafiz');
        expect(result.body.data.last_name).toBe('Pratama');
        expect(result.body.data.email).toBe('updated@example.com');
        expect(result.body.data.phone).toBe('081234567891');
    });



    it('it should reject if update request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: '',
                email: 'updatedexample.com',
                phone: ''
            })

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();

    });



    it('it should reject if contact not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: 'Hafiz',
                last_name: 'Pratama',
                email: 'updated@example.com',
                phone: '081234567891'
            })

        expect(result.status).toBe(404);

    });
});


describe("DELETE /api/contacts/:contactId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('Should can delete Contact', async () => {
        let testContact = await getTestContact();

        const result = await supertest(web)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe('ok');

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });

    it('Should reject if Contact is not found ', async () => {
        let testContact = await getTestContact();

        const result = await supertest(web)
            .delete('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});
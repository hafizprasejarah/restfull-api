import supertest from "supertest";
import { web } from "../src/application/web";
import { createTestAddress, getTestAddress, getTestContact, removeTestUser } from "../test/test-util.js";
import { createTestUser, removeAllTestContacts, createTestContact, removeAllTestAddresses } from "../test/test-util.js";
import { getUser } from "../test/test-util.js";
import { logger } from "../src/application/logging";


describe('POST /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();

    });

    it('should can create new address', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "Jalan Test",
                city: "Kota Test",
                province: "Provinsi Test",
                country: "Indonesia",
                postal_code: "321321"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("Jalan Test");
        expect(result.body.data.city).toBe("Kota Test");
        expect(result.body.data.province).toBe("Provinsi Test");
        expect(result.body.data.country).toBe("Indonesia");
        expect(result.body.data.postal_code).toBe("321321");
    });

    it('should reject if address request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "Jalan Test",
                city: "Kota Test",
                province: "Provinsi Test",
                country: "",
                postal_code: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if contact not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post('/api/contacts/' + (testContact.id + 1) + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "Jalan Test",
                city: "Kota Test",
                province: "Provinsi Test",
                country: "",
                postal_code: ""
            });

        expect(result.status).toBe(404);
    });



});


describe('GET /api/contacts/:contactId/addresses/:addressId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    });

    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();

    });

    it('should can get address', async () => {
        const contact = await getTestContact();
        const addres = await getTestAddress();

        const result = await supertest(web)
            .get('/api/contacts/' + contact.id + '/addresses/' + addres.id)
            .set('Authorization', 'test');


        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("Jalan Test");
        expect(result.body.data.city).toBe("Kota Test");
        expect(result.body.data.province).toBe("Provinsi Test");
        expect(result.body.data.country).toBe("Indonesia");
        expect(result.body.data.postal_code).toBe("321321");
    })
})
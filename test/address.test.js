import supertest from "supertest";
import { web } from "../src/application/web";
import { getTestContact, removeTestUser } from "../test/test-util.js";
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

});
import supertest from "supertest";
import { web } from "../src/application/web";
import { removeTestUser } from "../test/test-util.js";
import { createTestUser,removeAllTestContacts } from "../test/test-util.js";
import { getUser } from "../test/test-util.js";
import { logger } from "../src/application/logging";

describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async ()=>{
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
            logger.info(result.body);
            expect(result.status).toBe(200);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.first_name).toBe('test');
            expect(result.body.data.last_name).toBe('test');
            expect(result.body.data.email).toBe('test@example.com');
            expect(result.body.data.phone).toBe('081234567890');
    });

});
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { removeTestUser } from "../test/test-util.js";
import { createTestUser } from "../test/test-util.js";

describe('POST /api/users', function name() {
    afterEach(async () => {
        await removeTestUser();
    });

    it('Should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'Rahasia',
                name: 'test'
            });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();

    });

    it('Should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ' '
            });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Should reject if username already exists', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'Rahasia',
                name: 'test'
            });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "Rahasia",
                name: "test"
            });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'Rahasia'
            });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.token).not.toBe('test');
    });
});
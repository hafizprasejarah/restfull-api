import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { removeTestUser } from "../test/test-util.js";
import { createTestUser } from "../test/test-util.js";
import { getUser } from "../test/test-util.js";
import bcrypt from 'bcrypt';


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

    it('Should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                password: ''
            });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login with invalid credentials', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'sa',
                password: 'Rahasia'
            });

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();

    });


});


describe('GET /api/users/curre', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');


        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');

    });


    it('Should reject get current user if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah');

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();

    });
});


describe('PATCH /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should update current user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'Rahasia',
                name: 'Hafiz'
            })


        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('Hafiz');

        const user = await getUser();
        expect(await bcrypt.compare('Rahasia', user.password)).toBe(true);
    });

    it('Should update current user name only', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'Hafidz'
            })


        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('Hafidz');
    });


    it('Should update current user password only', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'Rahasia',
            })


        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');


        const user = await getUser();
        expect(await bcrypt.compare('Rahasia', user.password)).toBe(true);
    });


    it('Should reject update current user if request is invalid', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'tes')
            .send({
            })


        expect(result.status).toBe(401);
    });

});

describe('DELETE /api/users/logout', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should logout user', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe('ok');

        const user = await getUser();
        expect(user.token).toBeNull();
    });

    it('Should reject logout user if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });


});

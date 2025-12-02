import supertest from "supertest";
import { web } from "../src/application/web";
import { prismaClient } from "../src/application/database";

describe('POST /api/users', function name() {
    afterEach( async ()=>{
        await prismaClient.user.deleteMany({
            where: {
                username: 'Hafiz'
            }
        });
    });
    it('Should can register new user', async () => {
        const result = await  supertest(web)
        .post('/api/users')
        .send({
            username:'Hafiz',
            password:'Rahasia',
            name:'Hafiz Pratama'
        });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('Hafiz');
        expect(result.body.data.name).toBe('Hafiz Pratama');
        expect(result.body.data.password).toBeUndefined();
    });
});